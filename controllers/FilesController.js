// file specific controllers
const User = require("../models/user");
const client = require("../config/redisCient");
const File = require("../models/file");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");


exports.postUpload = async (req, res) => {
    // Creates a file and returns it's data
    const current_user = req.current_user;
    try {
        if (!current_user) {
            throw new Error("Unauthorized");
        }
        const {name, type, parentId, isPublic, data} = req.body;
        if (!name) {
            return res.status(400).json({error: "name missing"});
        }
        if (!type) {
            return res.status(400).json({error: "type missing"});
        }
        if (!data && type !== "folder") {
            return res.status(400).json({error: "folder missing"});
        }
        if (parentId) {
            const parentFile = await File.findOne({_id: parentId});
            if (!parentFile) {
                return res.status(400).json({error: "Invalid parent ID"});
            } else if (parentFile && parentFile.type !== "folder") {
                return res.status(400).json({error: "Parent is not a folder"});
            }
        }
        if (type === "folder") {
            const file = new File({
                name: name,
                type: type,
                parentId: parentId,
                isPublic: isPublic,
                userId: current_user._id
            });
            await file.save();
            return res.status(201).json(file);
        } else {
            const folderPath = process.env.FOLDER_PATH || "/tmp/files_manager";
            fs.mkdirSync(folderPath, { recursive: true });
            const fileName = uuidv4();
            const localPath = path.join(folderPath, fileName);
            fs.writeFileSync(
                localPath, Buffer.from(data, "base64").toString("utf-8"));
            const newFile = new File({
                userId: current_user._id,
                name: name,
                type: type,
                parentId: parentId,
                isPublic: isPublic,
                data: data,
                localPath: localPath
            });
            await newFile.save();
            return res.status(201).json(newFile);
        }
    } catch (err) {
        console.log(`${err}`);
        if (err.message.includes("unauthorized")) {
            return res.status(401).json({Error: err.message});
        }
        return res.status(500).json({Error: err.message});
    }
}

exports.getShow = async (req, res) => {
    // Retrieves a file based on the id params
    try {
        const current_user = req.current_user;
        if (!current_user) {
            return res.status(401).json({Error: "Unauthorized"});
        }
        const id = req.params.id;
        const file = await File.findOne({ _id: id });
        if (!file) {
            return res.status(404).json({Error: "Not found"});
        }
        return res.status(200).json(file);
    } catch (err) {
        console.log(`${err}`);
        return res.status(500).json({Error: err.message});
    }
}

exports.getIndex = async (req, res) => {
    // Retrieves all files with pagination
    try {
        const current_user = req.current_user;
        if (!current_user) {
            return res.status(401).json({Error: "Unauthorized"});
        }
        const parentId = parseInt(req.query.parentId) || 0;
        const page = parseInt(req.query.page) || 1;
        const limit = 20;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = {};

        // construct the next page
        if (endIndex < await File.countDocuments({parentId: parentId})) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        // construct the previous page
        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        // request for paginated data
        const files = await File.find({parentId: parentId})
        .skip(startIndex)
        .limit(limit)
        .exec();

        if (files.length === 0) {
            return res.status(404).json({});
        }
        result.current = files;
        return res.status(200).json(result);
    } catch (err) {
        console.error(`${err}`);
        return res.status(500).json({Error: err.message});
    }
}
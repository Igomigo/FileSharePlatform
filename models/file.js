// file model setup

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['folder', 'file', 'image'],
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        default: null
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    data: {
        type: String,
        required: function () {
            return this.type === 'file' || this.type === 'image'
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    localPath: String
}, {
    timestamps: true
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
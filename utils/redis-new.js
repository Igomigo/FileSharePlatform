// Contains the redis client class that connects to the redis server

const client = require("../config/redisCient");


exports.get = async (key) => {
    try {
        const value = await client.get(key);
        if (value !== null) {
            console.log(`Get the value of ${key} successfully`);
            return value;
        }
        else {
            return value;
        }
    } catch (err) {
        console.error(`Error retrieving the value of ${key}`);
    }
}

exports.set = async (key, value, ttl) => {
    try {
        await client.setEx(key, ttl, value);
        console.log(`${key} set to ${value} and will expire in ${ttl}`);
        return true;
    } catch (err) {
        console.error(`Error setting the value of ${key} to ${value}: ${err}`);
    }
}

exports.del = async (key) => {
    try {
        await client.del(key);
        console.log(`Value for ${key} deleted successfully`);
    } catch (err) {
        console.error(`Error deleting value for ${key}: ${err}`);
    }
}
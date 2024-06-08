// Contains the redis client class that connects to the redis server
const redis = require("redis");

class RedisClient {
    // constructor that initializes the class
    constructor () {
        // Create the redis client
        this.client = redis.createClient();

        this.client.on("connect", () => {
            console.log("Client connected successfully");
        }).on("error", (err) => {
            console.log(`Error establishing connection ${err}`);
        });
    }

    isAlive() {
        // Returns true if the redis client connects successfully
        if (this.client && this.client.ready) {
            return true;
        }
        return false;
    }

    async get(key) {
        // Returns the value stored in the key
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    console.log("Error while retrieving data from redis:", err);
                    reject(err);
                } else {
                    console.log(`Value retrieved for ${key} is ${value}`);
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, ttl) {
        // Sets a value that expires after ttl seconds
        return new Promise((resolve, reject) => {
            this.client.setex(key, ttl, value, (err, response) => {
                if (err) {
                    console.log(
                        `An error occured while setting the value of ${key}`);
                    reject(err);
                } else {
                    console.log(
                        `Value set for ${key} is ${value} with ttl ${ttl}`);
                    resolve(response);
                }
            });
        });
    }

    async del(key) {
        // Deletes the value associated with the key passed
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, response) => {
                if (err) {
                    console.log(`Failed to delete the value for ${key}`);
                    reject(err);
                } else {
                    console.log(`Key ${key} deleted`);
                    resolve(response);
                }
            });
        });
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
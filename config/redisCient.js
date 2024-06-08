// Establishes a redis connection

const redis = require("redis");
const client = redis.createClient(6397);

console.log("Establishing a connection to the redis server...");

client.on("connect", () => {
    console.log("Client connected to redis server successfully");
});
client.on("error", (err) => {
    console.log(`Error establishing connection to redis server: ${err}`);
});

client.connect();

module.exports = client;
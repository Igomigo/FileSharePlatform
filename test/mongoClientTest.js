const client = require("../utils/db");

console.log(client.isAlive()); // first call

setTimeout(() => {
    console.log(client.isAlive());  // Second call after 5 seconds

    setTimeout(() => {
        console.log(client.isAlive());  // Third call after another 5 seconds
    }, 5000);
}, 5000);
const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongo DB")
    } catch (error) {
        console.log(error || "Connection Fail");
    }
    
}


module.exports = connectDB;
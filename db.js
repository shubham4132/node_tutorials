const mongoose = require("mongoose");
//Define the mongoDB connection URF
// const mongoURL = "mongodb://localhost:27017/hotels";
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

//setup mongoDB connection
mongoose.connect(mongoURL);
//Get the Default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;
//define event listener for database connection
db.on("connected", () => {
  console.log("connected to the mongoDB server");
});
db.on("error", (err) => {
  console.log("MongoDB connection Error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
//Export the database connection
module.exports = db;

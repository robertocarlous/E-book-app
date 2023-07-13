const mongoose = require("mongoose");
const { importBookToDB } = require("../script/book.script");
require("dotenv").config();


const uri = "mongodb+srv://pabati4933:9a3ch0pBLY0vGTcR@cluster0.ieqw1yz.mongodb.net/user"
async function connectDB() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected!");
   // We don't need to import books to DB every time we start the server
  //await importBookToDB();
}


module.exports = connectDB;





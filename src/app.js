const appRouter = require('./router/index')
const express = require('express')
const dotenv = require("dotenv")
dotenv.config({path:".env"})
const connectDB = require("./config/db")
const app = express()

connectDB();
app.use(express.json())

const port =4000

app.use("/", appRouter);

app.listen( port,()=>{
    console.log(`app run on ${port}`)

})



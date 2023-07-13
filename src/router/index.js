const express = require("express");
const userRouter = require("./users.route");
const bookRouter = require("./book.route");

const router = express.Router();

router.use("/user", userRouter);
router.use("/books", bookRouter);
module.exports = router;

//ROUTES > CONTROLLERS > MODELS > SCHEMA;
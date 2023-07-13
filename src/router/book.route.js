const { Router } = require("express");
const {
  getBooks,
  getBookById,
  saveBook,
  getSavedBooks,
  deleteSavedBook,
} = require("../controller/books.controller");
const { verifyAuthToken } = require("../middleware/authenticate");

const bookRouter = Router();

bookRouter.get("/", getBooks);

// Saved Books - AUTH Token
bookRouter.post("/saveBook", verifyAuthToken, saveBook);
bookRouter.get("/savedBooks", verifyAuthToken, getSavedBooks);
bookRouter.delete("/savedBooks/:bookId", verifyAuthToken, deleteSavedBook);
bookRouter.get("/:bookId", getBookById); 

module.exports = bookRouter;
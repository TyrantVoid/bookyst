const express = require("express");
const {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  delBook,
  search,
  tags,
} = require("../controllers/book");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/add", verifyToken, addBook);
router.get("/", getAllBooks);
router.get("/find/:id", getBook);
router.put("/update/:id", verifyToken, updateBook);
router.delete("/delete/:id", verifyToken, delBook);
router.get("/search/", search);
router.get("/tags/", tags);

module.exports = router;

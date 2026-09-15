const express = require("express");

const router = express.Router();

const {
    addBook,
    getBooks,
    issueBook
} = require("../controllers/bookController");


router.post("/books", addBook);

router.get("/books", getBooks);

router.post("/books/:id/issue", issueBook);


module.exports = router;
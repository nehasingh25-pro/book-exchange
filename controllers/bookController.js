const Book = require("../models/book");
const addBook = async (req, res) => {

    try {
        const { title, author, quantity } = req.body;
        const book = new Book({
            title,
            author,
            quantity
        });
        await book.save();

        res.status(201).json({
            message: "Book added successfully",
            book: book
        });

    } catch (error) {

        res.status(500).json({
            message: "Book add nahi hui",
            error: error.message
        });

    }

};
const getBooks = async (req, res) => {

    try {

        const books = await Book.find();

        res.json(books);

    } catch (error) {

        res.status(500).json({
            message: "Books nahi mil payi",
            error: error.message
        });

    }

};
const issueBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                message: "Book nahi mili"
            });
        }
        if (book.quantity <= 0) {

            return res.status(400).json({
                message: "Book stock mein nahi hai"
            });
        }
        book.quantity = book.quantity - 1;

        await book.save();
        res.json({
            message: "Book issued successfully",
            book: book
        });
    } catch (error) {

        res.status(500).json({
            message: "Book issue nahi hui",
            error: error.message
        });
    }
};
module.exports = {
    addBook,
    getBooks,
    issueBook
};
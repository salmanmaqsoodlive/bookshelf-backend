const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

const createBook = asyncHandler(async (req, res) => {
  try {
    const publicationYear = new Date(req.body.publicationDate).getFullYear();
    const userId = req.userId;
    const book = await Book.create({
      ...req.body,
      publicationYear,
      user: userId,
    });
    res
      .status(201)
      .send({ success: true, message: "Book created successfully", book });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const updateBook = asyncHandler(async (req, res) => {
  try {
    const condition = { _id: req.params.id, user: req.userId },
      update = req.body,
      options = { multi: true, new: true, runValidators: true };

    const updatedBook = await Book.findOneAndUpdate(condition, update, options);
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getBooks = asyncHandler(async (req, res) => {
  try {
    const { search, sort } = req.query;

    let query = { user: req.userId };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    let isSort = { created: 1 };
    if (sort) {
      isSort.created = sort === "asc" ? 1 : -1;
    }

    let books = await Book.find(query).sort(isSort).populate('genre');

    // Group books by status
    let booksByStatus = {};
    books.forEach((book) => {
      if (!booksByStatus[book.status]) {
        booksByStatus[book.status] = [];
      }
      booksByStatus[book.status].push(book);
    });

    res.status(200).json({ success: true, books: booksByStatus });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createBook,
  updateBook,
  getBooks,
};

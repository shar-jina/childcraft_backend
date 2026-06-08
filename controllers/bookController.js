const Book = require("../models/Book");

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ index: 1, createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error fetching books" });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error(`Error fetching book ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error fetching book" });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Private (Admin Only)
const createBook = async (req, res) => {
  const { title, image, category, std, description, index } = req.body;

  if (!title || !image || !category || !std || !description) {
    return res.status(400).json({ message: "Please provide title, image, category, std, and description" });
  }

  try {
    let bookIndex = index;
    if (bookIndex === undefined || bookIndex === null) {
      const lastBook = await Book.findOne({}).sort({ index: -1 });
      bookIndex = lastBook ? lastBook.index + 1 : 0;
    }

    const book = new Book({
      title,
      image,
      category,
      std,
      description,
      index: bookIndex,
    });

    await book.save();
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Server error creating book" });
  }
};

// @desc    Update a book by ID
// @route   PUT /api/books/:id
// @access  Private (Admin Only)
const updateBook = async (req, res) => {
  const { title, image, category, std, description, index } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (title !== undefined) book.title = title;
    if (image !== undefined) book.image = image;
    if (category !== undefined) book.category = category;
    if (std !== undefined) book.std = std;
    if (description !== undefined) book.description = description;
    if (index !== undefined) book.index = index;

    await book.save();
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(`Error updating book ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error updating book" });
  }
};

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
// @access  Private (Admin Only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(`Error deleting book ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error deleting book" });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

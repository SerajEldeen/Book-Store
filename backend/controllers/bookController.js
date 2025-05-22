import Book from "../models/bookModel.js";
import { pagination } from "../utils/pagination.js";

export const createBook = async (req, res) => {
  const books = await Book.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      message: "Book created Successfully",
      books,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    let query = Book.find().select("-__v");
    query = pagination(query, req.query);
    const books = await query;
    const totalBooks = await Book.countDocuments();
    res.status(200).json({
      status: "success",
      results: books.length,
      books,
      totalPages: Math.ceil(totalBooks / (parseInt(req.query.limit, 10) || 10)),
      currentPage: parseInt(req.query.page, 10) || 1,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const updateBook = async (req, res) => {
  const books = await Book.findByIdAndUpdate(req.params.id, req.body);
  try {
    if (!books)
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    res.status(200).json({
      status: "success",
      message: "Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
export const deleteBook = async (req, res) => {
  const books = await Book.findByIdAndDelete(req.params.id);
  try {
    if (!books)
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    res.status(200).json({
      status: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {}
};

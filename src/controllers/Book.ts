import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/Book";

const CreateBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, category, value } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
    category,
    value,
  });

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};
const ReadBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findById(bookId)
    .populate("author")
    .select("-__v")
    .then((book) =>
      book
        ? res.status(200).json({ book })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const ReadAll = (req: Request, res: Response, next: NextFunction) => {
  return Book.find()
    .populate("author")
    .select("-__v")
    .then((book) => res.status(200).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};
const UpdateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body);

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const DeleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findByIdAndDelete(bookId)
    .then((book) =>
      book
        ? res.status(201).json({ message: "Deletado" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  CreateBook,
  ReadBook,
  ReadAll,
  UpdateBook,
  DeleteBook,
};

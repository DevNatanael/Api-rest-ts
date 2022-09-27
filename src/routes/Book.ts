import express from "express";
import controller from "../controllers/Book";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
const Token = require("../middleware/checkToken");

const router = express.Router();

//create
router.post(
  "/create",
  Token,
  ValidateSchema(Schemas.book.create),
  controller.CreateBook
);

//read
router.get("/get/:bookId", Token, controller.ReadBook);

//read all
router.get("/get/", Token, controller.ReadAll);

//update
router.patch(
  "/update/:bookId",
  Token,
  ValidateSchema(Schemas.book.create),
  controller.UpdateBook
);

//delete
router.delete("/delete/:bookId", Token, controller.DeleteBook);

export = router;

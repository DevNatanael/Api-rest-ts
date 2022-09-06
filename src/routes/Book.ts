import express from "express";
import controller from "../controllers/Book";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

//create
router.post(
  "/create",
  ValidateSchema(Schemas.book.create),
  controller.CreateBook
);

//read
router.get("/get/:bookId", controller.ReadBook);

//read all
router.get("/get/", controller.ReadAll);

//update
router.patch(
  "/update/:bookId",
  ValidateSchema(Schemas.book.create),
  controller.UpdateBook
);

//delete
router.delete("/delete/:bookId", controller.DeleteBook);

export = router;

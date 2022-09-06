import express from "express";
import controller from "../controllers/Book";

const router = express.Router();

//create
router.post("/create", controller.CreateBook);

//read
router.get("/get/:bookId", controller.ReadBook);

//read all
router.get("/get/", controller.ReadAll);

//update
router.patch("/update/:bookId", controller.UpdateBook);

//delete
router.delete("/delete/:bookId", controller.DeleteBook);

export = router;

import express from "express";
import controller from "../controllers/Author";

const router = express.Router();

//create
router.post("/create", controller.CreateAuthor);

//read
router.get("/get/:authorId", controller.ReadAuthor);

//read all
router.get("/get/", controller.ReadAllAuthor);

//update
router.patch("/update/:authorId", controller.UpdateAuthor);

//delete
router.delete("/delete/:authorId", controller.DeleteAuthor);

export = router;

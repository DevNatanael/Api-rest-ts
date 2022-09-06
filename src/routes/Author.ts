import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

//create
router.post(
  "/create",
  ValidateSchema(Schemas.author.create),
  controller.CreateAuthor
);

//read
router.get("/get/:authorId", controller.ReadAuthor);

//read all
router.get("/get/", controller.ReadAllAuthor);

//update
router.patch(
  "/update/:authorId",
  ValidateSchema(Schemas.author.create),
  controller.UpdateAuthor
);

//delete
router.delete("/delete/:authorId", controller.DeleteAuthor);

export = router;

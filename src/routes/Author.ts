import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
const Token = require("../middleware/checkToken");

const router = express.Router();

//create
router.post(
  "/create",
  Token,
  ValidateSchema(Schemas.author.create),
  controller.CreateAuthor
);

//read
router.get("/get/:authorId", Token, controller.ReadAuthor);

//read all
router.get("/get/", Token, controller.ReadAllAuthor);

//update
router.patch(
  "/update/:authorId",
  Token,
  ValidateSchema(Schemas.author.create),
  controller.UpdateAuthor
);

//delete
router.delete("/delete/:authorId", Token, controller.DeleteAuthor);

export = router;

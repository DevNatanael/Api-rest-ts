import express from "express";
import User from "../controllers/User";

const router = express.Router();

//register
router.post("/create", User.createUser);

//get todos os usuários
router.get("/getAll", User.getAllUsers);

//get user por id
router.get("/getOne/:userId", User.getUserById);

export = router;

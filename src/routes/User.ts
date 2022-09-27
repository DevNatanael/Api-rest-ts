import express from "express";
import User from "../controllers/User";
const Token = require("../middleware/checkToken");

const router = express.Router();

//register
router.post("/create", User.createUser);

//get todos os usuários
router.get("/getAll", Token, User.getAllUsers);

//get user por id
router.get("/getOne/:userId", Token, User.getUserById);

//login
router.post("/login", User.login);

export = router;

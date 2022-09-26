import express from "express";
import User from "../controllers/User";

const router = express.Router();

//register
router.post("/create", User.createUser);

//List
router.get("/getUsers", User.listUser);

export = router;

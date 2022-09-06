import express from "express";
import User from "../controllers/User";

const router = express.Router();

//create
router.post("/create", User.createUser);

export = router;

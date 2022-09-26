import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import * as bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 8);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

export const listUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ User });

    return res.status(200).json({ users });
  } catch (error) {
    console.log("erro: ", error);
    return res.status(500).json({ error });
  }
};

export default { createUser, listUser };

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

//recupera apenas um usuário por id
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

export const getAllUsers = async (req: Request, res: Response) => {
  return User.find()
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
};

export default { createUser, getUserById, getAllUsers };

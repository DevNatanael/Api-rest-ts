import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import * as bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

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

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      //verificar se o usuário existe
      return res.status(404).send({ msg: "Usuário não encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).send({ msg: "Senha Inválida" });
    }

    const secret = process.env.APP_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    return res.status(200).send({
      msg: "Autenticação realizada com sucesso",
      token,
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Aconteceu um erro, tente novamente mais tarde!!" });
  }
};

export default { createUser, getUserById, getAllUsers, login };

import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.APP_SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error: any) {
    res.status(400).send({ error: error.message, msg: "Token inválido" });
  }
}
module.exports = checkToken;

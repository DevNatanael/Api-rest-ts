import express, { application, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";

const router = express();

//conectando com o mongo
mongoose
  .connect("mongodb://localhost:27017/api")
  .then(() => {
    console.log("conectado ao mongo");
  })
  .catch((error) => {
    console.log(error);
  });

router.get("/", (req: Request, res: Response) => {
  return res.send("ola mundo");
});

router.listen(3333);

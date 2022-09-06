import express, { application, Request, Response } from "express";
import http from "http";
import { isError } from "joi";
import mongoose from "mongoose";
import Logging from "./library/logging";
import authorRoutes from "./routes/Author";
import bookRoute from "./routes/Book";

const router = express();

//conectando com o mongo
mongoose
  .connect("mongodb://localhost:27017/api")
  .then(() => {
    Logging.info("Conectado ao MongoDB");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Não foi possivel conectar: ");
    Logging.error(error);
  });

//healthcheck
router.get("/", (req: Request, res: Response) => {
  return res.send("ola mundo");
});

// apenas startar o server se o mongo conectar
const StartServer = () => {
  router.use((req: Request, res: Response, next) => {
    //log request
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      //log response
      Logging.info(
        `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //Regras da API
  router.use((req: Request, res: Response, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header(
      "Acces-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Acces-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  //routes
  router.use("/authors", authorRoutes);
  router.use("/books", bookRoute);

  // error handling
  router.use((req: Request, res: Response, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(3333, () => Logging.info(`Servidor rodando na porta 3333`));
};

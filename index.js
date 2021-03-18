const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./contacts/contacts.routes.js");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddleware();
    this.initRouters();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(cors({ origin: `http://localhost:${PORT}` }));
    this.server.use(express.json());
    this.server.use(morgan("dev"));
  }

  initRouters() {
    this.server.use("/api/contacts", router);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  }
}
const server = new Server();
server.start();

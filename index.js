const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const usersRouter = require("./users/users.routes.js");
const userAuthRouter = require("./auth/user.routes.js");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URL = `mongodb+srv://yulua_okrushko:${process.env.DB_PASSWORD}@cluster0.azzgk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.connectDB();
    this.initMiddleware();
    this.initRouters();
    this.startListening();
  }

  async connectDB() {
    try {
      this.server = express();
      await mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connecting successful");
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }

  initMiddleware() {
    this.server.use(cors({ origin: `http://localhost:${PORT}` }));
    this.server.use(express.json());
    this.server.use(morgan("dev"));
    this.server.use("/images", express.static("./public/images"));
  }

  initRouters() {
    this.server.use("/api/users", usersRouter);
    this.server.use("/api/auth", userAuthRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  }
}
const server = new Server();
server.start();

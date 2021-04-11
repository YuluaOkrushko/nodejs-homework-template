const express = require("express");
const userRouter = express.Router();
const UserController = require("./user.controller.js");

const user = new UserController();

userRouter.post("/register", user.createUser);
userRouter.post("/login", user.logIn);
userRouter.post("/logout", user.authorize, user.logOut);
userRouter.get("/current", user.authorize, user.getCurrentUser);

module.exports = userRouter;

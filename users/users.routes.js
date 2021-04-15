const express = require("express");
const userRouter = express.Router();
const UserController = require("./users.controller.js");
const { avatarUpdate } = require("../auxiliaries/avatarUpdate.js");
const { authorize } = require("../auxiliaries/authorize.js");
const user = new UserController();

userRouter.get("/current", authorize, user.getCurrentUser);
userRouter.patch(
  "/avatar",
  authorize,
  avatarUpdate().single("avatar"),
  user.updateAvatar
);

module.exports = userRouter;

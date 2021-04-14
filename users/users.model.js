const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;

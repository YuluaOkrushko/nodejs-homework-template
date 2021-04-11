const bcrypjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model.js");
const { userValidation } = require("./user.validation.js");
require("dotenv").config();

class userController {
  constructor() {
    this._costFactor = 5;
  }
  get createUser() {
    return this._createUser.bind(this);
  }
  async _createUser(req, res, next) {
    try {
      const { email, password, subscription } = req.body;
      const { error } = userValidation.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const existEmail = await userModel.findUserByEmail(email);
      if (existEmail) {
        res.status(400).json({ message: "Email in use" });
        return;
      }
      const passwordHash = await bcrypjs.hash(password, this._costFactor);

      const user = await userModel.create({
        email,
        password: passwordHash,
        subscription,
      });
      return res.status(201).json({
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const { error } = userValidation.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        res.status(404).json("Email or password is wrong");
        return;
      }
      const isPasswordValid = await bcrypjs.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(404).json("Email or password is wrong");
        return;
      }
      const newToken = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 2 * 24 * 60 * 60,
        }
      );
      await userModel.updateToken(user._id, newToken);
      res.status(200).json({
        token: newToken,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async logOut(req, res, next) {
    try {
      const user = req.body;
      await userModel.updateToken(user._id, null);
      return res.status(204).json();
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async getCurrentUser(req, res, next) {
    const { email, subscription } = req.user;
    try {
      return res.status(200).json({ email, subscription });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async authorize(req, res, next) {
    try {
      const authorizationHeader = req.get("Authorization") || "";
      const token = authorizationHeader.replace("Bearer ", "");
      let userId;
      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET).id;
      } catch (err) {
        res.status(401).json("Not authorized");
      }

      const user = await userModel.findById(userId);
      if (!user || user.token !== token) {
        res.status(401).json("Not authorized");
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;

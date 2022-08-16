const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const jwt_Secret = "manikyoSaringan";

//ROUTE 1 :Create a user using POST "/api/auth/createUser" doesnt require auth
router.post(
  "/createUser",

  body("name", "Enter a Valid name").isLength({ min: 3 }),
  body("email", "Enter a Valid e-mail").isEmail(),
  body("password", "Password must be more than 6 character").isLength({
    min: 6,
  }),

  async (req, res) => {
    //if errors , return bad req + the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if email exsits or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: " Sorry a user with this email Already exsists..." });
      }

      //create Salt using bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //Sending users id
      const data = {
        user: {
          id: user.id,
        },
      };
      const autTokken = jwt.sign(data, jwt_Secret);

      res.json({ autTokken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occurred");
    }
  }
);

//ROUTE 2 :Create a user using POST "/api/auth/login"
router.post(
  "/login",
  body("email", "Enter a Valid e-mail").isEmail(),
  body("password", "Password can't be blank").exists(),
  async (req, res) => {
    //if errors , return bad req + the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ error: "Enter right credentials " });
      }
      const passCompare = await bcrypt.compare(password, user.password);

      if (!passCompare) {
        return res.status(400).json({ error: "Enter right credentials " });
      }
      // sending user id
      const data = {
        user: {
          id: user.id,
        },
      };
      const autTokken = jwt.sign(data, jwt_Secret);
      res.json({ autTokken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occurred");
    }
  }
);

//ROUTE 3 :Get user Details POST "/api/auth/getUser" login req
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occurred");
  }
});
module.exports = router;

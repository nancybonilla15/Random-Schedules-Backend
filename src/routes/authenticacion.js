const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const helpers = require("../helpers/helper");
const JsonWebTokenError = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Login"));

router.post("/signup", async (req, res) => {
  const { name, identity, email, phone, password } = req.body;
  const hashedPassword = await helpers.encryptPassword(password);

  const newUser = new User({
    name,
    identity,
    email,
    phone,
    rank: 1,
    password: hashedPassword,
  });
  await newUser.save();

  const token = JsonWebTokenError.sign({ _id: newUser._id }, "UserSecretKey");
  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { identity, password } = req.body;

  const user = await User.findOne({ identity: identity });
  if (!user) return res.status(401).send("Usuario no encontrado en el sistema");

  const matchPassword = await helpers.matchPassword(password, user.password);
  if (!matchPassword) return res.status(401).send("Contraseña incorrecta")

  const token = JsonWebTokenError.sign({ _id: user._id }, "UserSecretKey");
  res.status(200).json({ token });
});

module.exports = router;

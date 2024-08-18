const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const helpers = require("../helpers/helper");
const JsonWebTokenError = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Login"));


router.post("/signin", async (req, res) => {
  const { identity, password } = req.body;

  const user = await User.findOne({ identity: identity });
  if (!user) return res.status(401).json({ 'response': 'Usuario no encontrado' });

  const matchPassword = await helpers.matchPassword(password, user.password);
  if (!matchPassword) return res.status(401).json({ 'response': 'Contraseña incorrecta' });

  const random_code = Math.floor(Math.random() * (9999 - 1111) + 1111)
  const random_code1 = Math.floor(Math.random() * (9999 - 1111) + 1111)

  console.log(random_code)
  logUser = {
    name: user.name,
    position: random_code + '-' + random_code1 + user.rank
  }

  const token = JsonWebTokenError.sign({ _id: user._id }, "UserSecretKey");
  res.status(200).json({ token, logUser });
});

module.exports = router;
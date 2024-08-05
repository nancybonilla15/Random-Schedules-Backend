const { Router } = require("express");
const JsonWebTokenError = require("jsonwebtoken");

const router = Router();

router.get("/app/dashboard", verifyToken, (req, res) => {
  // * CODIGO DEL ADMINISTRADOR
});

module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("No tienes autorizacion para acceder");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("No tienes autorizacion para acceder");
  }

  const payload = JsonWebTokenError.verify(token, "UserSecretKey");
  req.userSession = payload._id;
  next();
}

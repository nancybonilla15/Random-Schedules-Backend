const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/masters", async (req, res) => {
  const masters = await User.find();
  if (!masters)
    return res.status(401).json({ response: "No hay maestros registrados" });
  res.status(200).json({ masters });
});

router.post("/delete-user", async (req, res) => {
  const { id } = req.body;
  try {
    const state = await User.deleteOne({ _id: id });
    console.log(state);
    return res
      .status(200)
      .json({ response: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar documento:", err);
  }
});

router.post("/update-user", async (req, res) => {
  const { name, identity, email, phone, rank, _id } = req.body;
  //   console.log(req.body)
  try {
    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      return res.status(500).json({ response: "Error al encontrar usuario" });
    } else {
      const newData = {
        name: name,
        identity: identity,
        phone: phone,
        rank: rank,
        email: email,
      };

      const state = await User.updateOne({ _id: _id }, { $set: newData });
      console.log(state);
      return res
        .status(200)
        .json({ response: "Usuario actualizado correctamente" });
    }
  } catch (err) {
    console.error("Error al actualizar documento:", err);
  }
});

module.exports = router;

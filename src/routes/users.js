const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const helpers = require("../helpers/helper");

router.post("/users/create", async (req, res) => {
    const { name, identity, email, phone, password, rank } = req.body;
    const hashedPassword = await helpers.encryptPassword(password);
  
    const userIdentity = await User.findOne({ identity: identity });
    if (userIdentity) return res.status(401).json({ 'response': `La identidad ${identity} ya existe en un usuario.` });
  
    const userPhone = await User.findOne({ phone: phone });
    if (userPhone) return res.status(401).json({ 'response': `El telefono ${phone} ya existe en un usuario.` });
  
    const userEmail = await User.findOne({ email: email });
    if (userEmail) return res.status(401).json({ 'response': `El correo ${email} ya existe en un usuario.` });
  
    const newUser = new User({
      name,
      identity,
      email,
      phone,
      rank,
      password: hashedPassword,
    });
    await newUser.save();
  
    userRol = ''
    if(rank == 2){
      userRol = 'Operador'
    }else if(rank == 3){
      userRol = 'Maestro'
    }
  
    res.status(200).json({ "response": `Usuario tipo ${userRol} ingresado correctamente.` });
  });

router.get("/users/get", async (req, res) => {
  const users = await User.find();
  if (!users)
    return res.status(401).json({ response: "No hay maestros registrados" });
  res.status(200).json({ users });
});

router.post("/users/delete", async (req, res) => {
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

router.post("/users/update", async (req, res) => {
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

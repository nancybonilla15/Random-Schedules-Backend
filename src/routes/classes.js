const { Router } = require("express");
const router = Router();
const Class = require("../models/Class");

router.post("/classes/save", async (req, res) => {
  const { name } = req.body;

  const classFound = await Class.findOne({ name: name });
  if (classFound) return res.status(401).json({ 'response': `La clase ${name} ya existe.` });
  const newClass = new Class({
    name,
  });

  const state = await newClass.save();
  console.log(state)
  res.status(200).json({ response: "Clase creada correctamente." });
});

router.get("/classes/get", async (req, res) => {
  const classes = await Class.find();
  if (!classes)
    return res.status(401).json({ response: "No hay clases registradas" });
  res.status(200).json({ classes });
});

router.post("/classes/delete", async (req, res) => {
    const { id } = req.body;
    try {
      const state = await Class.deleteOne({ _id: id });
      console.log(state);
      return res
        .status(200)
        .json({ response: "Clase eliminada correctamente" });
    } catch (err) {
      console.error("Error al eliminar documento:", err);
    }
  });
  
  router.post("/classes/update", async (req, res) => {
    const { name, _id } = req.body;
    //   console.log(req.body)
    try {
      const classData = await Class.findById(_id);
      if (!classData) {
        return res.status(500).json({ response: "Error al encontrar clase" });
      } else {
        const newData = {
          name: name
        };
  
        const state = await Class.updateOne({ _id: _id }, { $set: newData });
        return res
          .status(200)
          .json({ response: "Clase actualizada correctamente" });
      }
    } catch (err) {
      console.error("Error al actualizar documento:", err);
    }
  });

module.exports = router;

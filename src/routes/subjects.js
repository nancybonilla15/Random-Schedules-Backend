const { Router } = require("express");
const router = Router();
const Subject = require("../models/Subject");

router.post("/subjects/save", async (req, res) => {
  const { name } = req.body;
  
  const subjectFound = await Subject.findOne({ name: name });
  if (subjectFound) return res.status(401).json({ 'response': `La asignatura ${name} ya existe.` });
  const newSubject = new Subject({
    name,
  });

  await newSubject.save();

  res.status(200).json({ response: "Asignatura creada correctamente." });
});

router.get("/subjects/get", async (req, res) => {
  const subjects = await Subject.find();
  if (!subjects)
    return res.status(401).json({ response: "No hay Asignaturas registradas" });
  res.status(200).json({ subjects });
});

router.post("/subjects/delete", async (req, res) => {
    const { id } = req.body;
    try {
      const state = await Subject.deleteOne({ _id: id });
      console.log(state);
      return res
        .status(200)
        .json({ response: "Asignatura eliminada correctamente" });
    } catch (err) {
      console.error("Error al eliminar documento:", err);
    }
  });
  
  router.post("/subjects/update", async (req, res) => {
    const { name, _id } = req.body;
    //   console.log(req.body)
    try {
      const SubjectData = await Subject.findById(_id);
      if (!SubjectData) {
        return res.status(500).json({ response: "Error al encontrar Asignatura" });
      } else {
        const newData = {
          name: name
        };
  
        const state = await Subject.updateOne({ _id: _id }, { $set: newData });
        return res
          .status(200)
          .json({ response: "Asignatura actualizada correctamente" });
      }
    } catch (err) {
      console.error("Error al actualizar documento:", err);
    }
  });

module.exports = router;

const { Schema, model } = require("mongoose");

const classSchema = new Schema(
  {
    name: String,
    students: Array,
    subjects: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Class", classSchema);

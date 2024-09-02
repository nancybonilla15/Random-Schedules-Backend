const { Schema, model } = require("mongoose");

const classSchema = new Schema(
  {
    name: String,
    students: Array,
    subjects: Array,
    hasScheule: Boolean
  },
  {
    timestamps: true,
  }
);

module.exports = model("Class", classSchema);

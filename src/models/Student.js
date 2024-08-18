const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name: String,
    identity: String,
    birthday: Date
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", studentSchema);

const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name: String,
    identity: String,
    birthday: Date,
    classes: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", studentSchema);

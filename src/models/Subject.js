const { Schema, model } = require("mongoose");

const subjetSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subject", subjetSchema);

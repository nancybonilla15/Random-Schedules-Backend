const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    identity: String,
    email: String,
    phone: String,
    password: String,
    classes: Array,
    rank: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);

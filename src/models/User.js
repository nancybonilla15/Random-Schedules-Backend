const { Schema, model, Model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  identity: String,
  email: String,
  phone: String,
  password: String,
  rank: Integer,
},{
    timestamps: true
});

module.exports = model("User", userSchema);

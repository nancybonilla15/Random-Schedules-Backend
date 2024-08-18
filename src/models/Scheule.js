const { Schema, model } = require("mongoose");

const scheuleSchema = new Schema(
  {
    class: String,
    masters: Array,
    details: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Scheule", scheuleSchema);

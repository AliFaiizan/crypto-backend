const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const signalSchema = mongoose.Schema(
  {
    name:String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Signal", signalSchema);

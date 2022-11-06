const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const signalSchema = mongoose.Schema(
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Signal", signalSchema);

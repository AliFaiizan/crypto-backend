const mongoose = require("mongoose");

const defiSchema = mongoose.Schema(
  {
    id: String,

    icon: String,

    name: String,

    currentPrice: Number,

    dailyRoi: Number,

  },
  {
    timestamps: true,
  }
);

userSchema.methods.getAllProjects = async function () {
const defi =await Defi.find();

  return defi;
};

const Defi = mongoose.model("Defi", defiSchema);

module.exports = Defi;

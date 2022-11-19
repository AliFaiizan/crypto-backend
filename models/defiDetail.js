const mongoose = require("mongoose");

const defiDetailSchema = mongoose.Schema(
  {
    id: String,

    totalCapital: String,

    currentPrice: Number,

    dailyRoi: Number,
    monthlyRoi: Number,
    lastWeekRoi: Number,

  },
  {
    timestamps: true,
  }
);



const DefiDetail = mongoose.model("DefiDetail", defiDetailSchema);

module.exports = DefiDetail;

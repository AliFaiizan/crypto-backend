const mongoose = require("mongoose");

const defiDetailSchema = mongoose.Schema(
  {
    id: String,

    totalCapital: String,

    currentPrice: Number,

    dailyRoi: Number,
    monthlyRoi: Number,
    lastWeekRoi: Number,
    projects:[
        {
            ref: "Defi"
        }
    ]
  },
  {
    timestamps: true,
  }
);
// defi project


const DefiDetail = mongoose.model("DefiDetail", defiDetailSchema);

module.exports = DefiDetail;

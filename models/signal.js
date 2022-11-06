const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const signalSchema = mongoose.Schema(
  {
    id: String,
    
    type:String,
    
    icon: String,

    name: String,

    currentPrice: Number,

    entry: Number,

    stopLoss: Number,

    targets: [
        {
            value: Number,
            roi: String,
        },
    ],

    info:[String],
    
    availableExchanges: [String],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Signal", signalSchema);

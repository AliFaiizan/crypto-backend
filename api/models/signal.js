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
const Signal = mongoose.model("Signal", signalSchema);
module.exports =Signal;

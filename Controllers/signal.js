const { validationResult } = require("express-validator");
const Signal = require("../models/signal");



module.exports.getSignal = async (req, res, next) => {

  try {
    const signals = await Signal.find();
    console.log(signals)
    res.status(400).json(signals);
  } catch (err) {
    console.log("There was an error white fetching signal", err);
  }

};

module.exports.postSignal = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const signals= await Signal.find();

    res.json(signals)
  }catch(err){
    console.log('There was an error white fetching signal',err)
  }
};



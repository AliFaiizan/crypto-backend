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
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

    const signal= req.body;

  try{
   await Signal.create(signal);

   res.status(400).json({
    message:`Sucessfully created the ${signal.name} signal`
   });
  }catch(err){
    console.log('There was an error white fetching signal',err)
  }
};



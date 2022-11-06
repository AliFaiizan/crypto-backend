const { validationResult } = require("express-validator");
const Signal = require("../models/signal");



module.exports.getSignal = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

};





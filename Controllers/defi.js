const { validationResult } = require("express-validator");
const Defi = require("../models/defi");

module.exports.getSignal = async (req, res, next) => {
  try {
    const defi = await Defi.getAllProjects()
    console.log(defi);
    res.status(400).json(defi);
  } catch (err) {
    console.log("There was an error white fetching signal", err);
  }
};

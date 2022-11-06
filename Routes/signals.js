const express = require("express");
const { check } = require("express-validator");
const SignalController = require("../Controllers/signal");
const Signal = require("../models/signal");

const router = express.Router();


//get signal
router.get(
    '/signal',
    SignalController.getSignal
);


//create Signal
router.post(
  "/signal",
  UserController.register
);



module.exports = router;

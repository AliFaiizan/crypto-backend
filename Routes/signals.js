const express = require("express");
const { check } = require("express-validator");
const SignalController = require("../Controllers/signal");
const Signal = require("../models/signal");
const {auth} =require('../helpers/auth')

const router = express.Router();


//get signal
router.get(
    '/signal',
    SignalController.getSignal
);


//create Signal
router.post(
  "/signal", auth,
  SignalController.postSignal
);

//update Signal

router.put('/signal/:id',auth,SignalController.updateSignal)

router.delete('/signal/:id',auth,SignalController.deleteSignal)



module.exports = router;

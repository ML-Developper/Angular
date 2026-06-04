
const express = require('express');
const router = express.Router();
const Medecin = require('../models/medecin');
const Patient = require('../models/patient');


// LOGIN

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    let user = await Medecin.findOne({ email: email.trim() });

    let role = "medecin";

    if (!user) {
      user = await Patient.findOne({ email: email.trim() });
      role = "patient";
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("DB PASSWORD =", JSON.stringify(user.password));
    console.log("INPUT PASSWORD =", JSON.stringify(password));

    const cleanInput = password.trim();
    const cleanDb = user.password.trim();

    if (cleanInput !== cleanDb) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    return res.json({
      message: "Login success",
      role,
      user: user._id
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

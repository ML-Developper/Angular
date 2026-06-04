const express = require('express');
const router = express.Router();

const Rendezvous = require('../models/rendezvous');
const Patient = require('../models/patient');


// AJOUTER RDV
router.post('/ajout', async (req, res) => {

  try {

    const rendezvous = new Rendezvous(req.body);

    const saved = await rendezvous.save();

    res.status(201).json(saved);

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

});


// LISTE RDV
router.get('/list', async (req, res) => {

  try {

    const rendezvous = await Rendezvous.find();

    res.json(rendezvous);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// RDV PAR ID
router.get('/:id', async (req, res) => {

  try {

    const rendezvous = await Rendezvous.findById(req.params.id);

    res.json(rendezvous);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// RDV PAR MEDECIN
router.get('/medecin/:id', async (req, res) => {

  try {

    const rdv = await Rendezvous.find({
      id_medecin: req.params.id
    });

    res.json(rdv);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

router.get('/by-date', async (req, res) => {
  const { id_medecin, date } = req.query;

  const rdvs = await Rendezvous.find({
    id_medecin,
    date
  });

  res.json(rdvs);
});

// RDV PAR PATIENT
router.get('/patient/:id', async (req, res) => {

  try {

    const rendezvous = await Rendezvous.find({

      id_patient: req.params.id

    }).populate('id_medecin');

    res.status(200).json(rendezvous);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});



router.get('/medecin/:medecinId', async (req, res) => {

  try {

    const id = req.params.medecinId;

    const rdvs = await RendezVous.find({
      id_medecin: id
    });

    let result = [];

    for (const r of rdvs) {

      const patient = await Patient.findById(r.id_patient);

      result.push({
        _id: r._id,
        date: r.date,
        heure: r.heure,
        patient: patient
      });

    }

    res.json(result);

  } catch (err) {

    console.log("ERROR RDV =", err);
    res.status(500).json(err);

  }

});

module.exports = router;
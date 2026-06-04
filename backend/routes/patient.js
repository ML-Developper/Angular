const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');

// POST - Ajouter un patient
router.post('/ajout', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json({ message: 'Patient added successfully', data: savedPatient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Liste tous les patients
router.get('/list', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(patient);
  } catch (err) {
    return res.status(500).json({
    message: err.message || "Server error"
  });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id); // ✅ Pas besoin de { _id: id }
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully', data: patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id, // ✅ Pas besoin de { _id: id }
      req.body,
      { new: true, runValidators: true } // ✅ runValidators ajouté
    );
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated successfully', data: patient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
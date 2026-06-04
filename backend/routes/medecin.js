const express = require('express');
const router = express.Router();

const Medecin = require('../models/medecin');
const RendezVous = require('../models/rendezvous');
const Patient = require('../models/patient');



//------------------ upload fichier --------------------------

const multer = require('multer');

const myStorage = multer.diskStorage({
    destination: (req, file, redirect) => {
        redirect(null, './uploads');
    },
    filename: (req, file, redirect) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        redirect(null, uniqueName);
    }
})

// middelwaer (aprer l appel et avant la fonction d ajout)
const upload = multer({ storage: myStorage });

//---------------------*ajouter data*---------------------------
router.post('/ajout', upload.single('image'), (req, res) => {
    //1 read data from request body
    let data = req.body;
    // 👉 ajouter le nom du fichier dans MongoDB
   
   // ✅ convertir jours_travaille en objet
    if (data.jours_travaille) {
        data.jours_travaille = JSON.parse(data.jours_travaille);
    }
   
    if (req.file) {
        data.image = req.file.filename;
    }
    //2 create new medecin instance
    let medecin = new Medecin(data);
        
    //3 save medecin to database
    medecin.save()
        .then((savedMedecin) => {
    console.log('Medecin added successfully :)', savedMedecin);

    res.status(200).json({
      message: "Medecin ajouté avec succès",
      data: savedMedecin
    });
  })
  .catch((err) => {
    console.error(err);

    res.status(400).json({
      message: "Erreur lors de l'ajout du médecin",
      error: err
    });
  });
});
//-------------------------------------------------------------

//---------------------*voir data*---------------------------
// find() : pour trouver tous les articles => array d'articles
// findById() : pour trouver un article par son ID => array d'un article
// find({ title: 'example' }) : pour trouver des articles avec un titre spécifique => array d'articles
// findOne() : pour trouver un article spécifique => un article
router.get('/list', (req, res) => {
    Medecin.find()
        .then((medecin) => res.send(medecin))
        .catch((err) => res.status(400).send('Error fetching Medecin :('));
});

//--------------------------------------------------------------

//---------------------*GET by id*------------------------------

router.get('/:id', (req, res) => {
    let myid = req.params.id;
    Medecin.findById({ _id: myid })
        .then((medecin) => {
            if (medecin) {
                res.send(medecin);
            } else {
                res.status(404).send('Medecin not found :(');
            }
        })
        .catch((err) => res.status(400).send('Error fetching Medecin :('));
});

//---------------------------------------------------------------

//---------------------*delete by id*------------------------------

router.delete('/delete/:id', (req, res) => {
    let myid = req.params.id;
    Medecin.findByIdAndDelete({ _id: myid })
        .then((medecin) => {
            if (medecin) {
                res.send('Medecin deleted successfully :) ' + medecin);
            } else {
                res.status(404).send('Medecin not found :(');
            }
        })
        .catch((err) => res.status(400).send('Error deleting Medecin :('));
});

//---------------------------------------------------------------

//---------------------*update by id*------------------------------

router.put('/update/:id', (req, res) => {
    let myid = req.params.id;
    let newData = req.body;
    Medecin.findByIdAndUpdate({ _id: myid }, newData, { new: true })
        .then((medecin) => {
            if (medecin) {
                res.send('Medecin updated successfully :) ' + medecin);
            } else {
                res.status(404).send('Medecin not found :(');
            }
        })
        .catch((err) => res.status(400).send('Error updating Medecin :('));
});

//---------------------------------------------------------------

//medecin par specialite

router.get('/patients/:medecinId', async (req, res) => {
  try {
    const id = req.params.medecinId;

    const rdvs = await RendezVous.find({ id_medecin: id });

    const patientIds = rdvs.map(r => 
      r.id_patient.replace(/"/g, '') // 🔥 SUPPRESSION DES GUILLEMETS
    );

    console.log("PATIENT IDS CLEAN =", patientIds);

    const patients = await Patient.find({
      _id: { $in: patientIds }
    });

    res.json(patients);

  } catch (err) {
    console.log("ERROR =", err);
    res.status(500).json(err);
  }
});

router.get('/rendezvous/:medecinId', async (req, res) => {

  try {

    const id = req.params.medecinId;

    const rdvs = await RendezVous.find({ id_medecin: id });

    const result = [];

    for (const r of rdvs) {

      const cleanId = r.id_patient.replace(/"/g, '');

      const patient = await Patient.findById(cleanId);

      result.push({
        _id: r._id,
        date: r.date,
        heure: r.heure,
        patient: patient // 👈 IMPORTANT
      });

    }

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/by-specialite/:specialite', async (req, res) => {

  try {

    const medecins = await Medecin.find({
      specialite: req.params.specialite
    });

    res.status(200).json(medecins);

  } catch (error) {

    res.status(500).json(error);
  }

});



module.exports = router; // ✅ Déplacé à la fin
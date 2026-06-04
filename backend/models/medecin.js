// 1 imprter mongoose
const mongoose = require('mongoose');

// 2 cree models
const Medecin = mongoose.model('Medecin', {
    nom: {
        type: String,
    },
    prenom: {
        type: String
    },
    date_n: {
        type: String
    },
    gouvernerat: {
        type: String,
    },
    tel: {
        type: Number
    },
    adresse: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    specialite: {
        type: String
    },
    assurance_m: {
        type: Boolean,
    },
    jours_travaille: {
        lundi: { type: Boolean, default: false },
        mardi: { type: Boolean, default: false },
        mercredi: { type: Boolean, default: false },
        jeudi: { type: Boolean, default: false },
        vendredi: { type: Boolean, default: false },
        samedi: { type: Boolean, default: false },
        dimanche: { type: Boolean, default: false }
    },
    heure_o: {
        type: String
    },
    heure_f: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'medecin'
    }
});

//3 export models
module.exports = Medecin;
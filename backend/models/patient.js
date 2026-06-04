

// 1 imprter mongoose
const mongoose = require('mongoose');

// 2 cree models
const Patient = mongoose.model('Patient', {

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
    role: {
        type: String,
        default: 'patient'
    }




});

//3 export models
module.exports = Patient;
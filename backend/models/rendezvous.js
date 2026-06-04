// 1 imprter mongoose
const mongoose = require('mongoose');

// 2 cree models
const Rendezvous = mongoose.model('Rendezvous', {
    date: {
        type: String,
    },

    heure: {
        type: String,
    },

    id_patient: {
        type: String
    },
    id_medecin: {
        type: String
    },
});

//3 export models
module.exports = Rendezvous;
// bibliotheque mongoose pour la connection a la base de données "npm install mongoose"
require('dotenv').config();

// import de mongoose
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

// connection a la base de données
mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB :)'))
    .catch(err => console.error('Could not connect to MongoDB', err));
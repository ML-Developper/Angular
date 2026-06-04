require('dotenv').config();

require('./config/connect');


const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS UNIQUE ET PROPRE
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('/', cors());

const medecinRoute = require('./routes/medecin');
const patientRoute = require('./routes/patient');
const rendezvousRoute = require('./routes/rendezvous');

app.use('/api/medecin', medecinRoute);
app.use('/api/patient', patientRoute);
app.use('/api/rendezvous', rendezvousRoute);

app.use('/api/auth', authRoute);

app.use('/images', express.static('./uploads'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
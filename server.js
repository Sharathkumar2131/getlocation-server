const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const locationRoutes = require('./routes/location');
const db = require('./db'); // Connection to MSSQL

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', locationRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

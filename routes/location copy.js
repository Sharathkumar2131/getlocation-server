const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint to save location data
router.post('/store-location', (req, res) => {
  const {
    latitude,
    longitude,
    street,
    area,
    town,
    city,
    state,
    country,
    postalCode,
    formattedAddress,
  } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required!' });
  }

  const query = `
    INSERT INTO locations (latitude, longitude, street, area, town, city, state, country, postalCode, full_address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    latitude,
    longitude,
    street,
    area,
    town,
    city,
    state,
    country,
    postalCode,
    formattedAddress || '',
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving location:', err);
      return res.status(500).json({ error: 'Failed to save location data!' });
    }
    res.status(201).json({
      message: 'Location data saved successfully!',
      id: result.insertId,
    });
  });
});

module.exports = router;

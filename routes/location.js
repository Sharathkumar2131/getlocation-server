const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have the MSSQL connection pool exported from db.js

// Endpoint to save location data
router.post('/store-location', async (req, res) => {
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
    fullAddress, // Expecting the full address
  } = req.body;

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required!' });
  }

  console.log("Received fullAddress:", fullAddress);

  // If fullAddress is not provided or is malformed, use a default value
  const safeFullAddress = fullAddress || 'No address provided';

  const query = `
    INSERT INTO locations (
      latitude, longitude, street, area, town, city, state, country, postalCode, fullAddress
    )
    VALUES (
      @latitude, @longitude, @street, @area, @town, @city, @state, @country, @postalCode, @fullAddress
    );
    SELECT SCOPE_IDENTITY() AS id;
  `;

  try {
    const pool = await db.connect();

    const result = await pool.request()
      .input('latitude', latitude)
      .input('longitude', longitude)
      .input('street', street || '')
      .input('area', area || '')
      .input('town', town || '')
      .input('city', city || '')
      .input('state', state || '')
      .input('country', country || '')
      .input('postalCode', postalCode || '')
      .input('fullAddress', safeFullAddress)
      .query(query);

    pool.close();

    const insertedId = result.recordset[0]?.id;

    res.status(201).json({
      message: 'Location data saved successfully!',
      id: insertedId,
    });
  } catch (err) {
    console.error('Error saving location:', err);
    res.status(500).json({ error: 'Failed to save location data!' });
  }
});

// Endpoint to retrieve all location data
router.get('/locations', async (req, res) => {
  const query = `
    SELECT * FROM locations;
  `;

  try {
    const pool = await db.connect();
    const result = await pool.request().query(query);
    pool.close();

    const locations = result.recordset;

    res.status(200).json({
      message: 'Locations retrieved successfully!',
      locations,
    });
  } catch (err) {
    console.error('Error retrieving locations:', err);
    res.status(500).json({ error: 'Failed to retrieve location data!' });
  }
});


module.exports = router;

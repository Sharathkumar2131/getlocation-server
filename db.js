const sql = require('mssql');

// SQL Server configuration
const dbConfig = {
  user: 'sharath',          // Replace with your SQL Server username
  password: 'Tsc@2131',     // Replace with your SQL Server password
  server: '103.168.173.174', // Replace with your SQL Server host
  port: 1433,               // SQL Server port (default is 1433)
  database: 'synergy',      // Replace with your database name
  options: {
    encrypt: false,         // Set to true if connecting to Azure or using SSL
    trustServerCertificate: true, // Required for self-signed certificates
  },
};

// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);

// Test the connection
pool.connect()
  .then(() => {
    console.log('Connected to SQL Server!');
  })
  .catch((err) => {
    console.error('Error connecting to SQL Server:', err);
  });

// Export the pool for use in other modules
module.exports = pool;

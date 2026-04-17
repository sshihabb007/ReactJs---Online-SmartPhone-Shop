// Database connection pool by Shihab
const mysql = require('mysql2');

const pool_shihab = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool_shihab.promise();

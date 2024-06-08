const mysql = require('mysql2/promise'); 

// konfigurasi untuk koneksi database MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'service-provider',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kondisi untuk mengecek database berjalan atau tidak
pool.getConnection((error, connection) => {
    if (error) {
        console.error('Database connection failed:', error.message);
    } else {
        console.log('Database connected!');
        connection.release();
    }
});

module.exports = {
    pool: pool,
    execute: pool.execute, // menggunakan pool untuk menjalankan kueri
};
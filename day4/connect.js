require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function main() {
    try {
        await client.connect();
        console.log('✓ เชื่อม PostgreSQL สำเร็จ');
        
        const result = await client.query('SELECT NOW()');
        console.log('เวลาบน server:', result.rows[0].now);
        
        await client.end();
        console.log('✓ ปิด connection แล้ว');
    } catch (err) {
        console.error('✗ Error:', err.message);
    }
}

main();
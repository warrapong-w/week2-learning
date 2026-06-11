require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


async function getCustomers() {
    try {
        await client.connect();
        
        const result = await client.query('SELECT * FROM customers');
        
        console.log(`พบ ${result.rows.length} ลูกค้า:\n`);
        
        for (const customer of result.rows) {
            console.log(`[${customer.id}] ${customer.name} (${customer.age}) - ${customer.city}`);
        }
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

getCustomers();
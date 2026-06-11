require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
async function addCustomer(name, age, city) {
    try {
        await client.connect();
        
        const sql = 'INSERT INTO customers (name, age, city) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, age, city];
        
        const result = await client.query(sql, values);
        
        console.log('✓ เพิ่มลูกค้าแล้ว:');
        console.log(result.rows[0]);
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

// รับ argument จาก command line
const name = process.argv[2];
const age = parseInt(process.argv[3]);
const city = process.argv[4];

if (!name || !age || !city) {
    console.log('Usage: node add-customer.js <name> <age> <city>');
    process.exit(1);
}

addCustomer(name, age, city);
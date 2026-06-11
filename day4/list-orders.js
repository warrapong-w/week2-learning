require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function listOrders() {
    try {
        await client.connect();
        
        const sql = `
            SELECT 
                o.id AS order_id,
                c.name AS customer_name,
                d.name AS drink_name,
                o.quantity,
                o.quantity * d.price AS total
            FROM orders o 
            JOIN customers c ON o.customer_id = c.id
            JOIN drinks d ON o.drink_id = d.id
            ORDER BY o.id
        `;
        
        const result = await client.query(sql);
        
        console.log('📊 รายงาน Orders:\n');
        console.log('-'.repeat(50));
        
        for (const row of result.rows) {
            console.log(
              `Order #${row.order_id}: ${row.customer_name} ซื้อ ${row.drink_name} ${row.quantity} แก้ว (${row.total} บาท)`
            );
        }
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

listOrders();
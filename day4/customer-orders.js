require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function getCustomerReport() {
    try {
        await client.connect();
        
        const sql = `
            SELECT 
                c.name,
                c.city,
                COUNT(o.id) AS order_count,
                SUM(o.quantity * d.price) AS total_spent
            FROM customers c
            LEFT JOIN orders o ON o.customer_id = c.id
            LEFT JOIN drinks d ON o.drink_id = d.id
            GROUP BY c.id, c.name, c.city
            ORDER BY total_spent DESC NULLS LAST
        `;
        
        const result = await client.query(sql);
        
        console.log('📊 รายงานลูกค้า:\n');
        console.log('Name'.padEnd(12), 'City'.padEnd(15), 'Orders', 'Total');
        console.log('-'.repeat(50));
        
        for (const row of result.rows) {
            console.log(
                row.name.padEnd(12),
                row.city.padEnd(15),
                String(row.order_count).padEnd(7),
                row.total_spent || 0
            );
        }
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

getCustomerReport();
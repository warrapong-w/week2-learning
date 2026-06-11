require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function topCustomers() {
     try {
        await client.connect();
        
        const sql =`SELECT 
                        c.name,
                        COUNT(o.id) AS order_count,
                        SUM(o.quantity * d.price) AS total
                    FROM orders o
                    JOIN customers c ON o.customer_id = c.id
                    JOIN drinks d ON o.drink_id = d.id
                    GROUP BY c.name
                    ORDER BY total DESC
                    LIMIT 5`;
        
        
                    
        const result = await client.query(sql);
        
        console.log('🏆 Top 5 ลูกค้า:\n');
        console.log('-'.repeat(50));
        let rank = 1;
        for (const row of result.rows) {
            console.log(`[${rank}] ${row.name} - ${row.total} บาท  (${row.order_count} orders)`);
            rank++;
        }
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
topCustomers();


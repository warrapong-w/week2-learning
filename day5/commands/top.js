const db = require('../db');

async function top() {
    const rows = await db.query(`
        SELECT 
            c.name,
            c.city,
            COUNT(o.id) AS order_count,
            SUM(o.quantity * d.price) AS total_spent
        FROM customers c
        JOIN orders o ON o.customer_id = c.id
        JOIN drinks d ON o.drink_id = d.id
        GROUP BY c.id, c.name, c.city
        ORDER BY total_spent DESC
        LIMIT 5
    `);
    
    console.log('🏆 Top 5 Customers\n');
    
    let rank = 1;
    for (const row of rows) {
        console.log(
            `${rank}. ${row.name.padEnd(12)} (${row.city.padEnd(12)}) ${row.total_spent} บาท / ${row.order_count} orders`
        );
        rank++;
    }
}

module.exports = top;
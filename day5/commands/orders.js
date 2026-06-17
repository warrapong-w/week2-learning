const db = require('../db');

async function orders() {
    const rows = await db.query(`
        SELECT 
            o.id,
            c.name AS customer,
            d.name AS drink,
            o.quantity,
            o.quantity * d.price AS total,
            o.order_date
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN drinks d ON o.drink_id = d.id
        ORDER BY o.id DESC
        LIMIT 20
    `);
    
    console.log('📋 Recent Orders (last 20):\n');
    
    for (const row of rows) {
        console.log(
            `[${row.id}] ${row.customer.padEnd(10)} → ${row.drink.padEnd(15)} × ${row.quantity}  = ${row.total} บาท`
        );
    }
}

module.exports = orders;
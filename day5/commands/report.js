const db = require('../db');

async function report() {
    // 1. Total revenue
    const totalRows = await db.query(`
        SELECT 
            COUNT(*) AS order_count,
            SUM(o.quantity * d.price) AS revenue
        FROM orders o
        JOIN drinks d ON o.drink_id = d.id
    `);
    const total = totalRows[0];
    
    // 2. By category
    const byCategoryRows = await db.query(`
        SELECT 
            d.category,
            SUM(o.quantity * d.price) AS revenue
        FROM orders o
        JOIN drinks d ON o.drink_id = d.id
        GROUP BY d.category
        ORDER BY revenue DESC
    `);
    
    // 3. By date
    const byDateRows = await db.query(`
        SELECT 
            o.order_date,
            COUNT(*) AS orders,
            SUM(o.quantity * d.price) AS revenue
        FROM orders o
        JOIN drinks d ON o.drink_id = d.id
        GROUP BY o.order_date
        ORDER BY o.order_date DESC
        LIMIT 7
    `);
    
    // แสดงผล
    console.log('📊 Sales Report\n');
    console.log(`Total Orders:  ${total.order_count}`);
    console.log(`Total Revenue: ${total.revenue} บาท`);
    
    console.log('\n--- By Category ---');
    for (const row of byCategoryRows) {
        console.log(`${row.category.padEnd(10)} ${row.revenue} บาท`);
    }
    
    console.log('\n--- Last 7 Days ---');
    for (const row of byDateRows) {
        const date = row.order_date.toISOString().slice(0, 10);
        console.log(`${date}: ${row.orders} orders, ${row.revenue} บาท`);
    }
}

module.exports = report;
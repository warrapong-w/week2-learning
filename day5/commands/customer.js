const db = require('../db');

async function customer(customerId) {
    if (isNaN(customerId)) {
        throw new Error('Customer id ต้องเป็นตัวเลข');
    }
    
    // 1. หา customer
    const customerRows = await db.query(
        'SELECT * FROM customers WHERE id = $1',
        [customerId]
    );
    if (customerRows.length === 0) {
        throw new Error(`Customer id ${customerId} ไม่พบ`);
    }
    const c = customerRows[0];
    
    // 2. หา orders ของลูกค้านี้
    const orderRows = await db.query(`
        SELECT 
            o.id,
            d.name AS drink,
            o.quantity,
            o.quantity * d.price AS total,
            o.order_date
        FROM orders o
        JOIN drinks d ON o.drink_id = d.id
        WHERE o.customer_id = $1
        ORDER BY o.order_date DESC, o.id DESC
    `, [customerId]);
    
    // 3. คำนวณ stats
    let totalSpent = 0;
    for (const order of orderRows) {
        totalSpent += order.total;
    }
    
    // แสดงผล
    console.log(`👤 ${c.name} (${c.city})\n`);
    console.log(`Age:           ${c.age}`);
    console.log(`Total Orders:  ${orderRows.length}`);
    console.log(`Total Spent:   ${totalSpent} บาท`);
    
    if (orderRows.length > 0) {
        console.log('\nOrder History:');
        for (const o of orderRows) {
            const date = o.order_date.toISOString().slice(0, 10);
            console.log(`  [${o.id}] ${date} - ${o.drink.padEnd(15)} × ${o.quantity} = ${o.total} บาท`);
        }
    }
}

module.exports = customer;
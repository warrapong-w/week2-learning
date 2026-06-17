const db = require('../db');

async function order(customerId, drinkId, quantity) {
    // Validation
    if (isNaN(customerId) || isNaN(drinkId) || isNaN(quantity)) {
        throw new Error('Arguments ต้องเป็นตัวเลข');
    }
    
    if (quantity <= 0) {
        throw new Error('Quantity ต้องมากกว่า 0');
    }
    
    // เช็คว่า customer + drink มีจริง
    const customer = await db.query(
        'SELECT id, name FROM customers WHERE id = $1',
        [customerId]
    );
    if (customer.length === 0) {
        throw new Error(`Customer id ${customerId} ไม่พบ`);
    }
    
    const drink = await db.query(
        'SELECT id, name, price FROM drinks WHERE id = $1',
        [drinkId]
    );
    if (drink.length === 0) {
        throw new Error(`Drink id ${drinkId} ไม่พบ`);
    }
    
    // Insert order
    const result = await db.query(
        `INSERT INTO orders (customer_id, drink_id, quantity)
         VALUES ($1, $2, $3)
         RETURNING id, order_date`,
        [customerId, drinkId, quantity]
    );
    
    const newOrder = result[0];
    const total = quantity * drink[0].price;
    
    // แสดงผล
    console.log('✓ สั่งของสำเร็จ!');
    console.log(`Order #${newOrder.id}`);
    console.log(`${customer[0].name} สั่ง ${drink[0].name} จำนวน ${quantity} แก้ว`);
    console.log(`รวม: ${total} บาท`);
    console.log(`Date: ${newOrder.order_date.toISOString().slice(0, 10)}`);
}

module.exports = order;
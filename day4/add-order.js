require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
/*
async function addOrder(customerId, drinkId, quantity) {
    try {
        await client.connect();
        
        const sql = 'INSERT INTO orders (customer_id, drink_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        const values = [customerId, drinkId, quantity];
        
        const result = await client.query(sql, values);
        
        console.log(`✓ เพิ่ม order สำเร็จ: ลูกค้า ID ${customerId} ซื้อเครื่องดื่ม ID ${drinkId} จำนวน ${quantity} แก้ว`);
        console.log(result.rows[0]);
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
*/
async function addOrder(customerId, drinkId, quantity) {
    try {
        await client.connect();
        
        // Insert
        const insertSql = `
            INSERT INTO orders (customer_id, drink_id, quantity) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const insertResult = await client.query(insertSql, [customerId, drinkId, quantity]);
        const newOrder = insertResult.rows[0];
        
        // Query เพื่อหาชื่อ
        const detailSql = `
            SELECT c.name AS customer_name, d.name AS drink_name, d.price
            FROM customers c, drinks d
            WHERE c.id = $1 AND d.id = $2
        `;
        const detailResult = await client.query(detailSql, [customerId, drinkId]);
        const detail = detailResult.rows[0];
        
        const total = quantity * detail.price;
        
        console.log('✓ เพิ่ม order สำเร็จ!');
        console.log(`Order #${newOrder.id}: ${detail.customer_name} ซื้อ ${detail.drink_name} ${quantity} แก้ว (${total} บาท)`);
        
        await client.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

// รับ argument จาก command line
const customerId = parseInt(process.argv[2]);
const drinkId = parseInt(process.argv[3]);
const quantity = parseInt(process.argv[4]);

if (isNaN(customerId) || isNaN(drinkId) || isNaN(quantity)) {
    console.log('Usage: node add-order.js <customer_id> <drink_id> <quantity>');
    process.exit(1);
}

addOrder(customerId, drinkId, quantity);


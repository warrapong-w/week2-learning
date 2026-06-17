const db = require('../db');

async function menu() {
    const drinks = await db.query(`
        SELECT id, name, category, price
        FROM drinks
        ORDER BY category, name
    `);
    
    console.log('☕ Coffee Shop Menu\n');
    
    let currentCategory = '';
    for (const drink of drinks) {
        if (drink.category !== currentCategory) {
            currentCategory = drink.category;
            console.log(`\n--- ${currentCategory} ---`);
        }
        console.log(`  [${drink.id}] ${drink.name.padEnd(20)} ${drink.price} บาท`);
    }
}

module.exports = menu;
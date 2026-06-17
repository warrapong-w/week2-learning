const db = require('./db');
const menu = require('./commands/menu');
const order = require('./commands/order');
const orders = require('./commands/orders');
const report = require('./commands/report');
const top = require('./commands/top');
const customer = require('./commands/customer');

const command = process.argv[2];

async function main() {
    try {
        switch (command) {
            case 'menu':
                await menu();
                break;

            case 'order': {
              const customerId = parseInt(process.argv[3]);
              const drinkId = parseInt(process.argv[4]);
              const quantity = parseInt(process.argv[5]);
              await order(customerId, drinkId, quantity);
              break;
            }
            case 'orders':
                await orders();
                break;
            
            case 'report':
                await report();
                break;
            
            case 'top':
                await top();
                break;
            
            case 'customer': {
                const id = parseInt(process.argv[3]);
                await customer(id);
                break;
            }
            default:
                console.log('Usage:');
                console.log('  node shop.js menu                    # ดูเมนู');
                console.log('  node shop.js order <c_id> <d_id> <q> # สั่งของ');
                console.log('  node shop.js orders                  # ดู orders');
                console.log('  node shop.js report                  # รายงาน');
                console.log('  node shop.js top                     # top customers');
                console.log('  node shop.js customer <id>           # ข้อมูลลูกค้า');
        }
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await db.close();
    }
}

main();
# Coffee Shop CLI

A command-line POS system for a coffee shop built with Node.js and PostgreSQL.

## Features

- **Menu**: View drinks organized by category
- **Order**: Place new orders with validation
- **Orders**: View recent order history
- **Report**: Sales analytics (by category, by date)
- **Top Customers**: Ranking of best customers
- **Customer Detail**: Full order history per customer

## Tech Stack

- **Runtime**: Node.js 24
- **Database**: PostgreSQL 18
- **Library**: pg (node-postgres) with connection pooling
- **Environment**: dotenv for secrets management

## Architecture

\`\`\`
day5/
├── db.js              # PostgreSQL connection pool
├── shop.js            # CLI router
└── commands/          # Business logic per command
    ├── menu.js
    ├── order.js
    ├── orders.js
    ├── report.js
    ├── top.js
    └── customer.js
\`\`\`

## Setup

\`\`\`bash
npm install
cp .env.example .env   # Then edit credentials
\`\`\`

## Usage

\`\`\`bash
node shop.js menu                           # View menu
node shop.js order <customer_id> <drink_id> <quantity>
node shop.js orders                         # Recent orders
node shop.js report                         # Sales report
node shop.js top                            # Top 5 customers
node shop.js customer <id>                  # Customer detail
\`\`\`

## Key Concepts Demonstrated

- PostgreSQL JOINs across 3 tables
- GROUP BY + aggregate functions (SUM, COUNT)
- Parameterized queries (SQL injection prevention)
- Connection pooling
- Async/await with try/catch/finally
- Modular architecture (single responsibility per file)
- Environment-based configuration
- Input validation with type/range/existence checks

## Author

Anakin (@warrapong-w)
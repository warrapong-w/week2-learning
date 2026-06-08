-- Clean slate
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS customers;

-- ลูกค้า (ไม่เปลี่ยน)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    city TEXT
);

-- เมนู (ไม่เปลี่ยน)
CREATE TABLE drinks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    price INTEGER NOT NULL
);

-- orders — เปลี่ยนเป็น customer_id และ drink_id (FOREIGN KEY!)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    drink_id INTEGER REFERENCES drinks(id),
    quantity INTEGER DEFAULT 1,
    order_date DATE DEFAULT CURRENT_DATE
);

-- ลูกค้า 10 คน
INSERT INTO customers (name, age, city) VALUES
    ('Anakin', 30, 'Udon Thani'),
    ('Somchai', 25, 'Bangkok'),
    ('Mali', 22, 'Bangkok'),
    ('Suda', 35, 'Phuket'),
    ('Niran', 49, 'Chiang Mai'),
    ('Ploy', 28, 'Bangkok'),
    ('Tum', 19, 'Khon Kaen'),
    ('Nok', 45, 'Chiang Mai'),
    ('Beam', 31, 'Bangkok'),
    ('Fern', 26, 'Udon Thani');

-- เมนู 8 ตัว
INSERT INTO drinks (name, category, price) VALUES
    ('Espresso', 'Coffee', 50),
    ('Latte', 'Coffee', 70),
    ('Cappuccino', 'Coffee', 70),
    ('Americano', 'Coffee', 55),
    ('Green Tea', 'Tea', 60),
    ('Matcha Latte', 'Tea', 85),
    ('Chocolate', 'Other', 75),
    ('Orange Juice', 'Other', 65);

-- orders — ใช้ id แทนชื่อ
-- (customer_id, drink_id, quantity, date)
INSERT INTO orders (customer_id, drink_id, quantity, order_date) VALUES
    (1, 2, 2, '2026-06-01'),   -- Anakin → Latte x2
    (2, 1, 1, '2026-06-01'),   -- Somchai → Espresso
    (3, 6, 1, '2026-06-01'),   -- Mali → Matcha Latte
    (1, 4, 1, '2026-06-02'),   -- Anakin → Americano
    (6, 3, 3, '2026-06-02'),   -- Ploy → Cappuccino x3
    (4, 5, 2, '2026-06-02'),   -- Suda → Green Tea x2
    (9, 2, 1, '2026-06-03'),   -- Beam → Latte
    (1, 7, 1, '2026-06-03'),   -- Anakin → Chocolate
    (5, 1, 2, '2026-06-03'),   -- Niran → Espresso x2
    (3, 2, 1, '2026-06-04'),   -- Mali → Latte
    (8, 6, 1, '2026-06-04'),   -- Nok → Matcha Latte
    (7, 8, 2, '2026-06-04'),   -- Tum → Orange Juice x2
    (10, 3, 1, '2026-06-05'),  -- Fern → Cappuccino
    (9, 4, 2, '2026-06-05'),   -- Beam → Americano x2
    (1, 2, 1, '2026-06-05'),   -- Anakin → Latte
    (6, 1, 1, '2026-06-05'),   -- Ploy → Espresso
    (4, 7, 1, '2026-06-06'),   -- Suda → Chocolate
    (2, 2, 2, '2026-06-06'),   -- Somchai → Latte x2
    (3, 5, 1, '2026-06-06'),   -- Mali → Green Tea
    (1, 3, 2, '2026-06-06');   -- Anakin → Cappuccino x2

SELECT 'Setup complete!' AS status;

-- Clean slate
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS customers;

-- Customer
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT,
  joined_at DATE DEFAULT CURRENT_DATE
);

-- Drink Menu
CREATE TABLE drinks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price INTEGER NOT NULL
);

-- Order
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name TEXT,
  drink_name TEXT,
  quantity INTEGER DEFAULT 1,
  total INTEGER,
  order_date DATE DEFAULT CURRENT_DATE
);

-- 10 Customers
INSERT INTO customers (name, age, city) VALUES
  ('Anakin', 30, 'Sakon Nakhon'),
  ('Somchai', 25, 'Bangkok'),
  ('Mali', 22, 'Bangkok'),
  ('Suda', 35, 'Phuket'),
  ('Niran', 49, 'Chiang Mai'),
  ('Ploy', 28, 'Bangkok'),
  ('Tum', 19, 'Khon Kaen'),
  ('Nok', 45, 'Chiang Mai'),
  ('Beam', 31, 'Bangkok'),
  ('Fern', 26, 'Udon Thani');

-- 8 of Menu
INSERT INTO drinks (name, category, price) VALUES
  ('Espresso', 'Coffee', 50),
  ('Latte', 'Coffee', 70),
  ('Cappuccino', 'Coffee', 70),
  ('Americano', 'Coffee', 55),
  ('Green Tea', 'Tea', 60),
  ('Matcha Latte', 'Tea', 85),
  ('Chocolate', 'Other', 75),
  ('Orange Juice', 'Other', 65);

-- 20 Orders
INSERT INTO orders (customer_name, drink_name, quantity, total, order_date) VALUES
  ('Anakin', 'Latte', 2, 140, '2026-06-01'),
  ('Somchai', 'Espresso', 1, 50, '2026-06-01'),
  ('Mali', 'Matcha Latte', 1, 85, '2026-06-01'),
  ('Anakin', 'Americano', 1, 55, '2026-06-02'),
  ('Ploy', 'Cappuccino', 3, 210, '2026-06-02'),
  ('Suda', 'Green Tea', 2, 120, '2026-06-02'),
  ('Beam', 'Latte', 1, 70, '2026-06-03'),
  ('Anakin', 'Chocolate', 1, 75, '2026-06-03'),
  ('Niran', 'Espresso', 2, 100, '2026-06-03'),
  ('Mali', 'Latte', 1, 70, '2026-06-04'),
  ('Nok', 'Matcha Latte', 1, 85, '2026-06-04'),
  ('Tum', 'Orange Juice', 2, 130, '2026-06-04'),
  ('Fern', 'Cappuccino', 1, 70, '2026-06-05'),
  ('Beam', 'Americano', 2, 110, '2026-06-05'),
  ('Anakin', 'Latte', 1, 70, '2026-06-05'),
  ('Ploy', 'Espresso', 1, 50, '2026-06-05'),
  ('Suda', 'Chocolate', 1, 75, '2026-06-06'),
  ('Somchai', 'Latte', 2, 140, '2026-06-06'),
  ('Mali', 'Green Tea', 1, 60, '2026-06-06'),
  ('Anakin', 'Cappuccino', 2, 140, '2026-06-06');


SELECT 'Setup complete!' AS status;

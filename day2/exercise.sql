--โจทย์ 1: แสดง orders ทั้งหมดพร้อมชื่อลูกค้า ชื่อเครื่องดื่ม
SELECT
    c.name,
    d.name AS drinksMenu,
    o.quantity
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id;

--โจทย์ 2: Anakin ซื้ออะไรไปบ้าง (แสดง drink name, quantity, date)
SELECT 
    d.name,
    o.quantity, 
    o.order_date 
FROM orders o 
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
WHERE c.name = 'Anakin';

--โจทย์ 3: ใครซื้อ Latte บ้าง (แสดงชื่อ + จำนวน)
SELECT
  c.name,
  o.quantity
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
WHERE d.name = 'Latte';

--โจทย์ 4: ลูกค้าจาก Bangkok ซื้อเครื่องดื่มอะไรบ้าง
SELECT
  c.name,
  d.name
FROM orders o 
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
WHERE c.city = 'Bangkok';

--โจทย์ 5: ยอดขายของแต่ละลูกค้า (ใครใช้เงินเท่าไร) เรียงจากมากไปน้อย
SELECT
  c.name,
  SUM(o.quantity * d.price) AS total
FROM orders o 
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
GROUP BY c.name
ORDER BY total DESC;


--โจทย์ 6: ยอดขายของแต่ละเมือง
SELECT
  c.city,
  SUM(o.quantity * d.price) AS total
FROM orders o 
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
GROUP BY c.city
ORDER BY total DESC;


--โจทย์ 7: เครื่องดื่มที่ขายได้กี่แก้วรวม (sort จากเยอะไปน้อย)
SELECT
  d.name,
  sum(o.quantity) AS total
FROM orders o 
JOIN drinks d ON o.drink_id = d.id
GROUP by d.name
ORDER BY total DESC;


--โจทย์ 8: หมวดเครื่องดื่มที่ทำเงินได้มากที่สุด
SELECT
  d.category,
  SUM(o.quantity) AS total,
  SUM(o.quantity * d.price) AS revenue
FROM orders o 
JOIN drinks d ON o.drink_id = d.id
GROUP by d.category
ORDER BY revenue DESC LIMIT 1;


--โจทย์ 9: ลูกค้าแต่ละคนซื้อกี่ครั้ง + ใช้เงินรวม (2 columns)
SELECT
  c.name,
  COUNT(c.name) AS times,
  SUM(o.quantity * d.price) AS cost
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
GROUP by c.name;


--โจทย์ 10: วันที่ขายดีสุด (date + revenue)
SELECT
  o.order_date,
  SUM(o.quantity * d.price) AS revenue
FROM orders o 
JOIN drinks d ON o.drink_id = d.id
GROUP BY o.order_date
ORDER BY revenue DESC LIMIT 1;


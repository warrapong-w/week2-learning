SELECT 
    c.name,
    SUM(o.quantity * d.price) AS total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
GROUP BY c.name
ORDER BY total_spent DESC;

SELECT 
    c.city,
    SUM(o.quantity * d.price) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
GROUP BY c.city
ORDER BY revenue DESC;

SELECT 
    d.category,
    d.name,
    SUM(o.quantity) AS total_sold
FROM orders o
JOIN drinks d ON o.drink_id = d.id
GROUP BY d.category, d.name
ORDER BY d.category, total_sold DESC;
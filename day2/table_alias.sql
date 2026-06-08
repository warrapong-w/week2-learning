SELECT 
    o.id,
    c.name AS customer,
    d.name AS drink,
    o.quantity,
    d.price,
    o.quantity * d.price AS total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN drinks d ON o.drink_id = d.id
ORDER BY o.id;
SELECT
  orders.id,
  customers.name,
  drinks.name,
  orders.quantity
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN drinks ON orders.drink_id = drinks.id;

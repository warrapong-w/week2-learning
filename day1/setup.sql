-- Week 2 Day 1: SQL Basics

-- Users table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    city TEXT
);

INSERT INTO users (name, age, city) VALUES
    ('Anakin', 30, 'Udon Thani'),
    ('Somchai', 25, 'Bangkok'),
    ('Somsri', 28, 'Chiang Mai'),
    ('Mali', 22, 'Bangkok'),
    ('Suda', 35, 'Phuket'),
    ('Niran', 49, 'Chiang Mai');

-- Todos table
DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    done BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO todos (text) VALUES
    ('เรียน SQL Day 1'),
    ('ออกกำลังกาย'),
    ('เรียน JavaScript'),
    ('Drink coffee'),
    ('Clean bathroom');
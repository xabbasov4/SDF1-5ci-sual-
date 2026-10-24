-- Cədvəlləri sıfırlamaq üçün (lazım olarsa)
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- 1. Tədbir Kateqoriyaları
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Initial data
INSERT INTO categories (name) VALUES ('Konfrans'), ('Seminar'), ('Təlim'), ('Müsabiqə');

-- 2. İstifadəçilər
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tədbirlər
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(200) NOT NULL,
    max_capacity INT NOT NULL CHECK (max_capacity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Qeydiyyatlar
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_event UNIQUE (user_id, event_id) -- Təkrar qeydiyyatın qarşısını alır
);
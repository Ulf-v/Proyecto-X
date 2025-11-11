-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS projectdb;
USE projectdb;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO users (name, email) VALUES
    ('Juan Perez', 'juan.perez@example.com'),
    ('Maria Garcia', 'maria.garcia@example.com'),
    ('Carlos Lopez', 'carlos.lopez@example.com')
ON DUPLICATE KEY UPDATE name=name;

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS projectdb;
USE projectdb;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    direccion VARCHAR (200), -- Puede ser null pq se rellena en el pedido no el registro
    password_hash VARCHAR(200), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria ENUM ('gafas','collar','pulsera','reloj','perfume','otros') DEFAULT 'otros',
    marca VARCHAR(100), -- Marca del producto hardcodeada para no crear tabla
    stock BIGINT NOT NULL DEFAULT 0,
    descripcion TEXT,
    precio DECIMAL(7, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_user BIGINT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES usuarios(id),
    precio_total DECIMAL(9,2) NOT NULL,
    metodo_pago ENUM ('tarjeta','bizum','transferencia','paypal') DEFAULT 'tarjeta',
    estado ENUM ('entregado','pendiente','enviado','cancelado', 'carrito') DEFAULT 'carrito',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos_productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cantidad BIGINT NOT NULL,
    precio_unitario DECIMAL(7,2) NOT NULL,
    id_pedido BIGINT NOT NULL REFERENCES pedidos(id),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    id_producto BIGINT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Insertar datos de ejemplo
INSERT INTO users (nombre_completo, email) VALUES
    ('Juan Perez', 'juan.perez@example.com'),
    ('Maria Garcia', 'maria.garcia@example.com'),
    ('Carlos Lopez', 'carlos.lopez@example.com')
ON DUPLICATE KEY UPDATE name=name;

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS projectdb;
USE projectdb;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    direccion VARCHAR (200), -- Puede ser null pq se rellena en el pedido no el registro
    password_hash VARCHAR(200), -- Puede ser null para cuentas de desarrollo o por defecto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria ENUM ('GAFAS','COLLAR','PULSERA','RELOJ','PERFUME','OTROS') DEFAULT 'OTROS',
    marca VARCHAR(100), -- Marca del producto hardcodeada para no crear tabla
    stock BIGINT NOT NULL DEFAULT 0,
    descripcion TEXT,
    precio DECIMAL(7, 2) NOT NULL,
    image_path VARCHAR(200) DEFAULT NULL, -- Ruta base para las imágenes del producto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_user BIGINT NOT NULL,
    INDEX idx_pedidos_id_user (id_user),
    CONSTRAINT fk_pe_usuarios FOREIGN KEY (id_user) REFERENCES usuarios(id),
    precio_total DECIMAL(9,2) NOT NULL,
    metodo_pago ENUM ('tarjeta','bizum','transferencia','paypal') DEFAULT 'tarjeta',
    estado ENUM ('entregado','pendiente','enviado','cancelado', 'carrito') DEFAULT 'carrito',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pedidos_productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cantidad BIGINT NOT NULL,
    precio_unitario DECIMAL(7,2) NOT NULL,
    id_pedido BIGINT NOT NULL,
    INDEX idx_pp_id_pedido (id_pedido),
    CONSTRAINT fk_pp_pedidos FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    id_producto BIGINT NOT NULL,
    INDEX idx_pp_id_producto (id_producto),
    CONSTRAINT fk_pp_productos FOREIGN KEY (id_producto) REFERENCES productos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de ejemplo de usuarios
INSERT INTO usuarios (nombre_completo, email) VALUES
    ('Juan Perez', 'juan.perez@example.com'),
    ('Maria Garcia', 'maria.garcia@example.com'),
    ('Carlos Lopez', 'carlos.lopez@example.com')
ON DUPLICATE KEY UPDATE nombre_completo=nombre_completo;

-- Insertar productos iniciales
INSERT INTO productos (id, nombre, categoria, marca, stock, descripcion, precio, image_path) VALUES
    (1, 'Chronos Edge', 'RELOJ', 'GoldenLine', 15, 'Reloj de acero pulido con correa intercambiable y detalles en oro cepillado.', 420.00, '/resources/productos/1'),
    (2, 'Lunar Velvet', 'OTROS', 'GoldenLine', 8, 'Bolso monocromático en terciopelo con acabados metálicos dorados.', 265.00, '/resources/productos/2'),
    (3, 'Auric Steps', 'OTROS', 'GoldenLine', 12, 'Calzado premium en cuero negro con inserciones metálicas doradas.', 310.00, '/resources/productos/3'),
    (4, 'Gilded Harmony', 'COLLAR', 'GoldenLine', 20, 'Set de accesorios en acero ennegrecido con detalles bañados en oro.', 195.00, '/resources/productos/4')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), image_path=VALUES(image_path);

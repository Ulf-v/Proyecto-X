package com.proyecto.backend.repository;

import com.proyecto.backend.model.PedidoProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// Repositorio JPA para operaciones de BD con líneas de pedido
@Repository
public interface PedidoProductoRepository extends JpaRepository<PedidoProducto, Long> {
    
    // Buscar todos los productos de un pedido
    List<PedidoProducto> findByPedidoId(Long pedidoId);
    
    // Buscar en qué pedidos aparece un producto
    List<PedidoProducto> findByProductoId(Long productoId);
}

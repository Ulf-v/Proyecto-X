package com.proyecto.backend.repository;

import com.proyecto.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// Repositorio JPA para operaciones de BD con pedidos
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    // Buscar pedidos de un usuario específico
    List<Pedido> findByUsuarioId(Long usuarioId);
    
    // Buscar pedidos por estado
    List<Pedido> findByEstado(Pedido.Estado estado);
    
    // Buscar pedidos de un usuario con un estado específico
    List<Pedido> findByUsuarioIdAndEstado(Long usuarioId, Pedido.Estado estado);
}

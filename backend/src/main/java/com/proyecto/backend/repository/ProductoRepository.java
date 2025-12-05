package com.proyecto.backend.repository;

import com.proyecto.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// Repositorio JPA para operaciones de BD con productos
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar productos por categoría
    List<Producto> findByCategoria(Producto.Categoria categoria);
    
    // Buscar productos por marca
    List<Producto> findByMarca(String marca);
    
    // Buscar productos por nombre (búsqueda parcial, case-insensitive)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}

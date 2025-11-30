package com.proyecto.backend.repository;

import com.proyecto.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

// Repositorio JPA para operaciones de BD con usuarios
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Buscar usuario por email
    Optional<User> findByEmail(String email);

    // Buscar usuarios por nombre (búsqueda parcial, case-insensitive)
    List<User> findByNombreCompletoContainingIgnoreCase(String nombre);
}

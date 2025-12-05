package com.proyecto.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;
import java.time.LocalDateTime;

// Entidad que representa un producto en la tienda
@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Categoria categoria = Categoria.OTROS;
    
    @Column(length = 100)
    private String marca;
    
    @Column(nullable = false)
    private Long stock = 0L;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(nullable = false, precision = 7, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "image_path", length = 200)
    private String imagePath;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Establece timestamps al crear el producto
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    // Actualiza el timestamp al modificar el producto
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Enum de categorías de productos
    public enum Categoria {
        GAFAS("gafas"),
        COLLAR("collar"),
        PULSERA("pulsera"),
        RELOJ("reloj"),
        PERFUME("perfume"),
        OTROS("otros");
        
        private final String valor;
        
        Categoria(String valor) {
            this.valor = valor;
        }
        
        public String getValor() {
            return valor;
        }
    }
}

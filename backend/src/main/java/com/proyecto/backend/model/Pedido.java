package com.proyecto.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Entidad que representa un pedido realizado por un usuario
@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "pedidoProductos") // Excluye la lista para evitar lazy loading en logs
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Usuario que realiza el pedido
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false)
    private User usuario;
    
    @Column(name = "precio_total", nullable = false, precision = 9, scale = 2)
    private BigDecimal precioTotal;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago", length = 20)
    private MetodoPago metodoPago = MetodoPago.TARJETA;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Estado estado = Estado.CARRITO;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Lista de productos incluidos en el pedido, elimina los productos asociados si se elimina el pedido
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoProducto> pedidoProductos = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum MetodoPago {
        TARJETA("tarjeta"),
        BIZUM("bizum"),
        TRANSFERENCIA("transferencia"),
        PAYPAL("paypal");
        
        private final String valor;
        
        MetodoPago(String valor) {
            this.valor = valor;
        }
        
        public String getValor() {
            return valor;
        }
    }
    
    public enum Estado {
        ENTREGADO("entregado"),
        PENDIENTE("pendiente"),
        ENVIADO("enviado"),
        CANCELADO("cancelado"),
        CARRITO("carrito");
        
        private final String valor;
        
        Estado(String valor) {
            this.valor = valor;
        }
        
        public String getValor() {
            return valor;
        }
    }
}

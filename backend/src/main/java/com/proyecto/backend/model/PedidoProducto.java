package com.proyecto.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.math.BigDecimal;

// Entidad intermedia que relaciona pedidos con productos (línea de pedido)
@Entity
@Table(name = "pedidos_productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PedidoProducto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;
    
    @Column(nullable = false)
    private Long cantidad;
    
    // Precio del producto en el momento de la compra (puede diferir del precio actual)
    @Column(name = "precio_unitario", nullable = false, precision = 7, scale = 2)
    private BigDecimal precioUnitario;
}

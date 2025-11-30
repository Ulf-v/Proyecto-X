package com.proyecto.backend.controller;

import com.proyecto.backend.model.PedidoProducto;
import com.proyecto.backend.service.PedidoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador REST para gestionar líneas de pedido (CRUD + búsquedas por pedido/producto)
@RestController
@RequestMapping("/api/pedido-productos")
@CrossOrigin(origins = "*")
public class PedidoProductoController {
    
    @Autowired
    private PedidoProductoService pedidoProductoService;
    
    @GetMapping
    public ResponseEntity<List<PedidoProducto>> getAllPedidoProductos() {
        return ResponseEntity.ok(pedidoProductoService.getAllPedidoProductos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PedidoProducto> getPedidoProductoById(@PathVariable Long id) {
        return pedidoProductoService.getPedidoProductoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/pedido/{pedidoId}")
    public ResponseEntity<List<PedidoProducto>> getPedidoProductosByPedido(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(pedidoProductoService.getPedidoProductosByPedido(pedidoId));
    }
    
    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<PedidoProducto>> getPedidoProductosByProducto(@PathVariable Long productoId) {
        return ResponseEntity.ok(pedidoProductoService.getPedidoProductosByProducto(productoId));
    }
    
    @PostMapping
    public ResponseEntity<PedidoProducto> createPedidoProducto(@RequestBody PedidoProducto pedidoProducto) {
        PedidoProducto created = pedidoProductoService.createPedidoProducto(pedidoProducto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PedidoProducto> updatePedidoProducto(@PathVariable Long id, @RequestBody PedidoProducto pedidoProducto) {
        try {
            PedidoProducto updated = pedidoProductoService.updatePedidoProducto(id, pedidoProducto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedidoProducto(@PathVariable Long id) {
        pedidoProductoService.deletePedidoProducto(id);
        return ResponseEntity.noContent().build();
    }
}

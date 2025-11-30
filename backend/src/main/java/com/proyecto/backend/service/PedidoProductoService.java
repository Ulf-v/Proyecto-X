package com.proyecto.backend.service;

import com.proyecto.backend.model.PedidoProducto;
import com.proyecto.backend.repository.PedidoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Servicio que contiene la lógica de negocio para líneas de pedido
@Service
public class PedidoProductoService {
    
    @Autowired
    private PedidoProductoRepository pedidoProductoRepository;
    
    public List<PedidoProducto> getAllPedidoProductos() {
        return pedidoProductoRepository.findAll();
    }
    
    public Optional<PedidoProducto> getPedidoProductoById(Long id) {
        return pedidoProductoRepository.findById(id);
    }
    
    public List<PedidoProducto> getPedidoProductosByPedido(Long pedidoId) {
        return pedidoProductoRepository.findByPedidoId(pedidoId);
    }
    
    public List<PedidoProducto> getPedidoProductosByProducto(Long productoId) {
        return pedidoProductoRepository.findByProductoId(productoId);
    }
    
    public PedidoProducto createPedidoProducto(PedidoProducto pedidoProducto) {
        return pedidoProductoRepository.save(pedidoProducto);
    }
    
    public PedidoProducto updatePedidoProducto(Long id, PedidoProducto pedidoProductoDetails) {
        PedidoProducto pedidoProducto = pedidoProductoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PedidoProducto not found"));
        
        pedidoProducto.setPedido(pedidoProductoDetails.getPedido());
        pedidoProducto.setProducto(pedidoProductoDetails.getProducto());
        pedidoProducto.setCantidad(pedidoProductoDetails.getCantidad());
        pedidoProducto.setPrecioUnitario(pedidoProductoDetails.getPrecioUnitario());
        
        return pedidoProductoRepository.save(pedidoProducto);
    }
    
    public void deletePedidoProducto(Long id) {
        pedidoProductoRepository.deleteById(id);
    }
}

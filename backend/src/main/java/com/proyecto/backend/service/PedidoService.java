package com.proyecto.backend.service;

import com.proyecto.backend.model.Pedido;
import com.proyecto.backend.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Servicio que contiene la lógica de negocio para pedidos
@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> getPedidoById(Long id) {
        return pedidoRepository.findById(id);
    }
    
    public List<Pedido> getPedidosByUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }
    
    public List<Pedido> getPedidosByEstado(Pedido.Estado estado) {
        return pedidoRepository.findByEstado(estado);
    }
    
    public List<Pedido> getPedidosByUsuarioAndEstado(Long usuarioId, Pedido.Estado estado) {
        return pedidoRepository.findByUsuarioIdAndEstado(usuarioId, estado);
    }
    
    public Pedido createPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    
    public Pedido updatePedido(Long id, Pedido pedidoDetails) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido not found"));
        
        pedido.setUsuario(pedidoDetails.getUsuario());
        pedido.setPrecioTotal(pedidoDetails.getPrecioTotal());
        pedido.setMetodoPago(pedidoDetails.getMetodoPago());
        pedido.setEstado(pedidoDetails.getEstado());
        
        return pedidoRepository.save(pedido);
    }
    
    public void deletePedido(Long id) {
        pedidoRepository.deleteById(id);
    }
}

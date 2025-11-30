package com.proyecto.backend.service;

import com.proyecto.backend.model.Producto;
import com.proyecto.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Servicio que contiene la lógica de negocio para productos
@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }
    
    public Optional<Producto> getProductoById(Long id) {
        return productoRepository.findById(id);
    }
    
    public List<Producto> getProductosByCategoria(Producto.Categoria categoria) {
        return productoRepository.findByCategoria(categoria);
    }
    
    public List<Producto> getProductosByMarca(String marca) {
        return productoRepository.findByMarca(marca);
    }
    
    public List<Producto> searchProductosByNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public Producto createProducto(Producto producto) {
        return productoRepository.save(producto);
    }
    
    public Producto updateProducto(Long id, Producto productoDetails) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto not found"));
        
        producto.setNombre(productoDetails.getNombre());
        producto.setCategoria(productoDetails.getCategoria());
        producto.setMarca(productoDetails.getMarca());
        producto.setStock(productoDetails.getStock());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());
        
        return productoRepository.save(producto);
    }
    
    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}

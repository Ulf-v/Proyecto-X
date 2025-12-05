// Cargar productos destacados desde el backend
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const errorDiv = document.getElementById('products-error');
    
    if (!container) {
        console.error('Container featured-products no encontrado');
        return;
    }
    
    console.log('Iniciando carga de productos...');
    
    try {
        // Ocultar mensaje de error si existe
        if (errorDiv) errorDiv.classList.add('hidden');
        
        // Verificar que apiService esté disponible
        if (typeof apiService === 'undefined') {
            throw new Error('apiService no está disponible. Verifica que api.js se cargue correctamente.');
        }
        
        console.log('Obteniendo productos del backend...');
        // Obtener productos del backend
        const productos = await apiService.getProductos();
        console.log('Productos obtenidos:', productos);
        
        // Filtrar solo los primeros 4 productos (IDs 1-4)
        const destacados = productos.filter(p => p.id >= 1 && p.id <= 4);
        console.log('Productos destacados:', destacados);
        
        // Limpiar container
        container.innerHTML = '';
        
        if (destacados.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-smoke/60">No hay productos disponibles en este momento.</p>
                </div>
            `;
            return;
        }
        
        // Renderizar productos
        destacados.forEach(producto => {
            const card = new ProductCard(producto);
            const cardElement = card.render();
            
            // Añadir event listener para el modal
            cardElement.addEventListener('click', (e) => {
                // Solo si no se hizo click en el botón "Ver más"
                if (!e.target.closest('button')) {
                    createProductModal(producto);
                }
            });
            
            container.appendChild(cardElement);
        });
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        
        // Mostrar mensaje de error
        container.innerHTML = '';
        if (errorDiv) {
            errorDiv.classList.remove('hidden');
        } else {
            container.innerHTML = `
                <div class="col-span-full bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center">
                    <p class="text-red-400">Error al cargar los productos. Por favor, verifica que el backend esté funcionando.</p>
                    <button onclick="loadFeaturedProducts()" class="mt-4 px-4 py-2 bg-gold text-onyx rounded-full text-sm uppercase tracking-[0.3em] hover:bg-gold/90 transition">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', loadFeaturedProducts);

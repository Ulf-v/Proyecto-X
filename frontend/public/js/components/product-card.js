// Componente reutilizable para tarjetas de producto
class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        const card = document.createElement('article');
        card.className = 'group bg-graphite rounded-3xl border border-gold/10 overflow-hidden transition hover:border-gold/40 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.4)] transform hover:scale-[1.02] cursor-pointer';
        card.dataset.productId = this.product.id;
        
        card.innerHTML = `
            <div class="h-56 bg-gradient-to-br from-onyx via-graphite to-gold/40 overflow-hidden relative">
                <img 
                    src="${this.getProductImage()}" 
                    alt="${this.product.nombre}"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onerror="this.src='./resources/placeholder.jpg'"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-6 space-y-4">
                <div class="space-y-2">
                    <h3 class="text-xl font-semibold text-white group-hover:text-gold transition">${this.product.nombre}</h3>
                    <p class="text-sm text-smoke/70 line-clamp-2 min-h-[40px]">${this.product.descripcion || 'Producto exclusivo de nuestra colección.'}</p>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-gold/10">
                    <span class="text-2xl text-gold font-semibold tracking-wide">€${this.product.precio}</span>
                    <button 
                        class="px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold border border-gold/40 rounded-full hover:bg-gold hover:text-onyx transition-all"
                        onclick="window.location.href='/pages/product/${this.product.id}'"
                    >
                        Ver más
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    getProductImage() {
        // Si el producto tiene imagePath, usarlo; sino, generar por ID
        const basePath = this.product.imagePath || `./resources/productos/${this.product.id}`;
        return `${basePath}/Foto1.jpg`;
    }
}

// Función para crear modal de producto rápido
function createProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // Generar ruta de imagen dinámicamente
    const basePath = product.imagePath || `./resources/productos/${product.id}`;
    const imageSrc = `${basePath}/Foto1.jpg`;
    
    modal.innerHTML = `
        <div class="bg-graphite rounded-3xl border border-gold/20 max-w-2xl w-full p-8 space-y-6 animate-fadeIn relative" onclick="event.stopPropagation()">
            <button 
                class="absolute top-4 right-4 text-smoke/60 hover:text-gold transition"
                onclick="this.closest('.fixed').remove()"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/2">
                    <img 
                        src="${imageSrc}" 
                        alt="${product.nombre}"
                        class="w-full rounded-2xl border border-gold/10"
                        onerror="this.src='./resources/placeholder.jpg'"
                    >
                </div>
                <div class="md:w-1/2 space-y-4">
                    <h2 class="text-3xl font-semibold text-white">${product.nombre}</h2>
                    <p class="text-smoke/70">${product.descripcion || 'Producto exclusivo de nuestra colección.'}</p>
                    
                    ${product.marca ? `<p class="text-sm text-gold/70">Marca: ${product.marca}</p>` : ''}
                    ${product.stock ? `<p class="text-sm text-smoke/50">Stock disponible: ${product.stock} unidades</p>` : ''}
                    
                    <div class="pt-4 border-t border-gold/10">
                        <p class="text-3xl text-gold font-bold">€${product.precio}</p>
                    </div>
                    
                    <div class="flex gap-3 pt-4">
                        <button 
                            class="add-to-cart-modal-btn flex-1 px-6 py-3 bg-gold text-onyx rounded-full text-sm uppercase tracking-[0.3em] font-semibold hover:bg-gold/90 transition"
                        >
                            Añadir
                        </button>
                        <button 
                            class="px-6 py-3 border border-gold/40 rounded-full text-sm uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition"
                            onclick="window.location.href='/pages/product/${product.id}'"
                        >
                            Ver página
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const addBtn = modal.querySelector('.add-to-cart-modal-btn');
    addBtn.onclick = () => {
        if (window.Cart) {
            window.Cart.addItem(product, 1);
            addBtn.textContent = '✓ Añadido';
            addBtn.classList.add('bg-green-600');
            addBtn.classList.remove('bg-gold');
            setTimeout(() => modal.remove(), 800);
        } else {
            console.error('Cart no disponible');
        }
    };
    
    document.body.appendChild(modal);
}

// Exponer función global para uso en el DOM
window.createProductModal = createProductModal;

// Configuración de la API
const API_CONFIG = {
    BASE_URL: 'http://localhost:8081/api',
    ENDPOINTS: {
        PRODUCTOS: '/productos',
        USUARIOS: '/users',
        PEDIDOS: '/pedidos',
        HEALTH: '/health'
    }
};

// Servicio de API
class ApiService {
    constructor(baseUrl = API_CONFIG.BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async fetchJson(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    // Productos
    async getProductos() {
        return this.fetchJson(API_CONFIG.ENDPOINTS.PRODUCTOS);
    }

    async getProducto(id) {
        return this.fetchJson(`${API_CONFIG.ENDPOINTS.PRODUCTOS}/${id}`);
    }

    async getProductosByCategoria(categoria) {
        return this.fetchJson(`${API_CONFIG.ENDPOINTS.PRODUCTOS}/categoria/${categoria}`);
    }

    async searchProductos(nombre) {
        return this.fetchJson(`${API_CONFIG.ENDPOINTS.PRODUCTOS}/search?nombre=${encodeURIComponent(nombre)}`);
    }

    // Health check
    async checkHealth() {
        return this.fetchJson(API_CONFIG.ENDPOINTS.HEALTH);
    }
}

// Instancia global del servicio
const apiService = new ApiService();

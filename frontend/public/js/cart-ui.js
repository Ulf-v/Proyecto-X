// Cart UI: updates header badge and renders cart page UI
(function () {
  function formatMoney(n) { return '€' + Number(n).toFixed(2); }

  function getProductThumbUrl(item) {
    return `/resources/productos/${encodeURIComponent(item.id)}/Foto1.jpg`;
  }

  function buildPedidoFromCart(items) {
    const lines = items.map(it => {
      const precio = Number(it.precio || it.price || 0);
      const qty = Number(it.qty || 0);
      return {
        producto: { id: Number(it.id) },
        cantidad: qty,
        precioUnitario: precio
      };
    });

    const total = items.reduce((sum, it) => {
      const precio = Number(it.precio || it.price || 0);
      const qty = Number(it.qty || 0);
      return sum + (precio * qty);
    }, 0);

    // Formato inspirado en el modelo Pedido/PedidoProducto del backend
    return {
      usuario: { id: 1 },
      precioTotal: Number(total.toFixed(2)),
      metodoPago: 'TARJETA',
      estado: 'PENDIENTE',
      createdAt: new Date().toISOString(),
      pedidoProductos: lines
    };
  }

  function updateBadge(count) {
    const el = document.getElementById('cart-count');
    if (!el) return;
    el.textContent = count > 0 ? String(count) : '';
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  function renderCartPage(items) {
    const root = document.getElementById('cart-root');
    if (!root) return;
    if (!items || items.length === 0) {
      root.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <p class="text-sm text-smoke/60">Tu carrito está vacío.</p>
          <a href="/" class="inline-flex items-center justify-center px-6 py-3 border border-gold/30 rounded-full text-xs uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition">
            Volver a la tienda
          </a>
        </div>
      `;
      return;
    }

    const table = document.createElement('table');
    table.className = 'w-full text-sm';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr class="text-left text-xs uppercase tracking-[0.3em] text-smoke/50"><th class="py-3">Producto</th><th class="py-3">Cantidad</th><th class="py-3">Precio u.</th><th class="py-3">Total</th><th class="py-3"></th></tr>';
    const tbody = document.createElement('tbody');

    let grand = 0;
    items.forEach(it => {
      const row = document.createElement('tr');
      row.className = 'border-b border-gold/10';
      const precio = it.precio || it.price || 0;
      const nombre = it.nombre || it.name || 'Producto';
      const total = precio * it.qty; 
      grand += total;
      row.innerHTML = `
        <td class="py-4">
          <div class="flex items-center gap-4">
            <img
              src="${getProductThumbUrl(it)}"
              alt="${nombre}"
              class="w-14 h-14 rounded-xl border border-gold/15 object-cover bg-onyx"
              onerror="this.src='/resources/logo.svg'"
            >
            <div class="min-w-0">
              <div class="font-semibold text-white truncate">${nombre}</div>
              <div class="text-xs text-smoke/50">Ref. #${it.id}</div>
            </div>
          </div>
        </td>
        <td class="py-4">
          <input data-id="${it.id}" type="number" min="0" value="${it.qty}" class="w-20 bg-onyx border border-gold/20 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-gold">
        </td>
        <td class="py-4 text-smoke/80">${formatMoney(precio)}</td>
        <td class="py-4 font-semibold text-gold">${formatMoney(total)}</td>
        <td class="py-4 text-right">
          <button data-remove="${it.id}" class="text-xs uppercase tracking-[0.3em] text-gold hover:text-white transition">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    const tfoot = document.createElement('div');
    tfoot.className = 'mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4';
    tfoot.innerHTML = `
      <div class="flex items-baseline justify-between md:justify-start gap-4">
        <div class="text-xs uppercase tracking-[0.3em] text-smoke/50">Total</div>
        <div class="text-2xl font-semibold text-gold">${formatMoney(grand)}</div>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <a href="/" class="px-6 py-3 border border-gold/30 rounded-full text-xs uppercase tracking-[0.3em] hover:border-gold hover:text-gold transition text-center">
          Seguir comprando
        </a>
        <button id="checkout-btn" type="button" class="px-6 py-3 bg-gold text-onyx rounded-full text-xs uppercase tracking-[0.3em] font-semibold hover:bg-gold/90 transition">
          Comprar
        </button>
      </div>
    `;

    table.appendChild(thead); table.appendChild(tbody);
    root.innerHTML = ''; root.appendChild(table); root.appendChild(tfoot);

    const checkoutBtn = root.querySelector('#checkout-btn');
    checkoutBtn?.addEventListener('click', () => {
      const currentItems = window.Cart.getItems();
      const pedido = buildPedidoFromCart(currentItems);
      console.log('Pedido (simulado):', pedido);
      window.Cart.clear();
      root.innerHTML = `
        <div class="p-8 text-center space-y-3">
          <p class="text-white text-lg font-semibold">Compra finalizada</p>
          <p class="text-sm text-smoke/60">Hemos vaciado tu carrito. Revisa la consola para ver el JSON del pedido.</p>
          <a href="/" class="inline-flex items-center justify-center px-6 py-3 bg-gold text-onyx rounded-full text-xs uppercase tracking-[0.3em] font-semibold hover:bg-gold/90 transition">
            Volver a inicio
          </a>
        </div>
      `;
    });

    // attach handlers
    root.querySelectorAll('input[type="number"]').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const id = inp.getAttribute('data-id');
        const qty = parseInt(inp.value) || 0;
        window.Cart.setItemQty(id, qty);
      });
    });

    root.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-remove');
        window.Cart.removeItem(id);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // initial badge
    updateBadge(window.Cart.getCount());
    // subscribe to updates
    window.Cart.subscribe(items => updateBadge(items.reduce((s,i)=>s+i.qty,0)));

    // if cart page present, render
    const root = document.getElementById('cart-root');
    if (root) {
      renderCartPage(window.Cart.getItems());
      window.Cart.subscribe(items => renderCartPage(items));
    }
  });
})();

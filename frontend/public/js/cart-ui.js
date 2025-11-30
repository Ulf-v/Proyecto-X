// Cart UI: updates header badge and renders cart page UI
(function () {
  function formatMoney(n) { return '€' + Number(n).toFixed(2); }

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
      root.innerHTML = '<div class="p-6 text-sm text-smoke/60">Tu carrito está vacío.</div>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'w-full text-sm';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr class="text-left text-smoke/60"><th>Producto</th><th>Cantidad</th><th>Precio u.</th><th>Total</th><th></th></tr>';
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
        <td class="py-3">${nombre}</td>
        <td class="py-3"><input data-id="${it.id}" type="number" min="0" value="${it.qty}" class="w-20 bg-onyx border border-gold/20 rounded px-2 py-1"></td>
        <td class="py-3">${formatMoney(precio)}</td>
        <td class="py-3">${formatMoney(total)}</td>
        <td class="py-3"><button data-remove="${it.id}" class="text-sm text-gold">Eliminar</button></td>
      `;
      tbody.appendChild(row);
    });

    const tfoot = document.createElement('div');
    tfoot.className = 'mt-4 flex items-center justify-between';
    tfoot.innerHTML = `<div class="text-sm text-smoke/60">Total</div><div class="text-lg font-semibold text-gold">${formatMoney(grand)}</div>`;

    table.appendChild(thead); table.appendChild(tbody);
    root.innerHTML = ''; root.appendChild(table); root.appendChild(tfoot);

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

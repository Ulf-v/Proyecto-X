// Attach preview modal behaviour to elements with data-product-id
(function () {
  async function fetchProducts() {
    const res = await fetch('./data/products.json');
    return res.ok ? res.json() : [];
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'product-preview-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.innerHTML = `
      <div class="max-w-3xl w-full bg-graphite rounded-2xl overflow-hidden">
        <div class="flex">
          <div class="w-1/2 p-4 bg-black/10" id="preview-gallery"></div>
          <div class="w-1/2 p-6" id="preview-info"></div>
        </div>
      </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
    return modal;
  }

  function closeModal() {
    const mm = document.getElementById('product-preview-modal');
    if (mm) mm.remove();
  }

  function renderPreview(product) {
    let modal = document.getElementById('product-preview-modal') || createModal();
    const gallery = modal.querySelector('#preview-gallery');
    const info = modal.querySelector('#preview-info');
    gallery.innerHTML = `<img src="${product.images[0]}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg">`;
    info.innerHTML = `
      <h3 class="text-xl font-semibold text-white">${product.name}</h3>
      <p class="mt-2 text-sm text-smoke/70">${product.description}</p>
      <ul class="mt-3 text-sm text-smoke/60">${product.specs.map(s=>`<li>• ${s}</li>`).join('')}</ul>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-gold font-semibold">€${product.price}</span>
        <div class="flex gap-2">
          <button id="preview-add" class="px-4 py-2 bg-gold text-onyx rounded">Añadir</button>
          <a href="./product.html?id=${encodeURIComponent(product.id)}" class="px-4 py-2 border border-gold/20 rounded text-sm text-gold">Ver página</a>
        </div>
      </div>
    `;

    const addBtn = modal.querySelector('#preview-add');
    addBtn.onclick = () => { window.Cart.addItem(product, 1); addBtn.textContent = 'Añadido'; setTimeout(()=> addBtn.textContent = 'Añadir', 900); };
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    const map = Object.fromEntries(products.map(p=>[p.id,p]));
    document.querySelectorAll('[data-product-id]').forEach(el => {
      const id = el.getAttribute('data-product-id');
      if (!id || !map[id]) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        // avoid clicks on links or buttons inside
        if (e.target.closest('a') || e.target.closest('button')) return;
        renderPreview(map[id]);
      });
    });
  });
})();

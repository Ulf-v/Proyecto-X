(function () {
  async function fetchProducts() {
    const res = await fetch('./data/products.json');
    return res.ok ? res.json() : [];
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function renderGallery(images) {
    let idx = 0;
    const container = document.createElement('div');
    container.className = 'space-y-3';
    const img = document.createElement('img');
    img.src = images[0];
    img.className = 'w-full h-96 object-cover rounded-lg';
    const controls = document.createElement('div');
    controls.className = 'flex items-center justify-between gap-2';
    const prev = document.createElement('button'); prev.textContent = '<';
    const next = document.createElement('button'); next.textContent = '>';
    prev.className = next.className = 'px-3 py-1 border rounded text-sm';
    prev.onclick = () => { idx = (idx - 1 + images.length) % images.length; img.src = images[idx]; };
    next.onclick = () => { idx = (idx + 1) % images.length; img.src = images[idx]; };
    const thumbs = document.createElement('div'); thumbs.className = 'flex gap-2 mt-2';
    images.forEach((src, i) => {
      const t = document.createElement('img');
      t.src = src; t.className = 'w-20 h-14 object-cover rounded cursor-pointer border';
      t.onclick = () => { idx = i; img.src = src; };
      thumbs.appendChild(t);
    });
    controls.appendChild(prev); controls.appendChild(next);
    container.appendChild(img); container.appendChild(controls); container.appendChild(thumbs);
    return container;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    const id = getParam('id');
    const product = products.find(p => p.id === id);
    const root = document.getElementById('product-root');
    if (!product) {
      root.innerHTML = '<div class="p-6">Producto no encontrado.</div>';
      return;
    }

    const left = document.createElement('div');
    left.appendChild(renderGallery(product.images));

    const right = document.createElement('div');
    right.innerHTML = `
      <h1 class="text-2xl font-semibold text-white">${product.name}</h1>
      <p class="mt-3 text-sm text-smoke/70">${product.description}</p>
      <ul class="mt-3 text-sm text-smoke/60">${product.specs.map(s=>`<li>• ${s}</li>`).join('')}</ul>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-gold text-2xl font-semibold">€${product.price}</span>
      </div>
    `;

    const actions = document.createElement('div');
    actions.className = 'mt-6 flex gap-3';
    const add = document.createElement('button'); add.textContent = 'Añadir al carrito';
    add.className = 'px-4 py-2 bg-gold text-onyx rounded';
    add.onclick = () => { window.Cart.addItem(product, 1); add.textContent = 'Añadido'; setTimeout(()=> add.textContent = 'Añadir al carrito',800); };
    const viewCart = document.createElement('a'); viewCart.href = '#'; viewCart.textContent = 'Ver carrito';
    viewCart.className = 'px-4 py-2 border rounded border-gold/20 text-gold';
    actions.appendChild(add); actions.appendChild(viewCart);
    right.appendChild(actions);

    root.appendChild(left); root.appendChild(right);
  });
})();

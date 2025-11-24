// Simple cart module using localStorage. Exposes a Cart object with methods.
const Cart = (function () {
  const KEY = 'goldenline_cart_v1';
  let subscribers = [];

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Cart read error', e);
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    notify(items);
  }

  function notify(items) {
    subscribers.forEach((fn) => {
      try { fn(items); } catch (e) { console.error(e); }
    });
  }

  return {
    getItems() { return read(); },
    addItem(product, qty = 1) {
      const items = read();
      const idx = items.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        items[idx].qty += qty;
      } else {
        items.push({ id: product.id, name: product.name, price: product.price, qty });
      }
      write(items);
    },
    removeItem(productId) {
      const items = read().filter(i => i.id !== productId);
      write(items);
    },
    setItemQty(productId, qty) {
      const items = read();
      const idx = items.findIndex(i => i.id === productId);
      if (idx >= 0) {
        if (qty <= 0) {
          // remove
          items.splice(idx, 1);
        } else {
          items[idx].qty = qty;
        }
        write(items);
      }
    },
    clear() { write([]); },
    getCount() { return read().reduce((s, i) => s + i.qty, 0); },
    subscribe(fn) { subscribers.push(fn); return () => { subscribers = subscribers.filter(f => f !== fn); }; }
  };
})();

// Expose for global usage in simple pages
window.Cart = Cart;

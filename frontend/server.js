const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Middleware
app.use(express.json());
app.use(express.static(publicDir));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Rutas de páginas
app.get('/pages/status', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'status.html'));
});

app.get('/pages/login', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'login.html'));
});

app.get('/pages/register', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'register.html'));
});

app.get('/pages/cart', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'cart.html'));
});

app.get('/pages/product/:id', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'product.html'));
});

// Rutas legacy (compatibilidad)
app.get('/status', (req, res) => res.redirect('/pages/status'));
app.get('/login', (req, res) => res.redirect('/pages/login'));
app.get('/register', (req, res) => res.redirect('/pages/register'));
app.get('/cart', (req, res) => res.redirect('/pages/cart'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'frontend' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});

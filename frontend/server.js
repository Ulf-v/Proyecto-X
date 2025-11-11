const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Middleware
app.use(express.json());
app.use(express.static(publicDir));

// Páginas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/status', (req, res) => {
  res.sendFile(path.join(publicDir, 'status.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicDir, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(publicDir, 'register.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'frontend' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`);
});

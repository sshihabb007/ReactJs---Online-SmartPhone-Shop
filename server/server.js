// SmartPhoneShop Server by Shihab
const express = require('express');
const cors = require('cors');
const path = require('path');

const app_shihab = express();
const PORT_SHIHAB = 5000;

// Middleware
app_shihab.use(cors());
app_shihab.use(express.json());

// Serve product images statically
app_shihab.use('/Image', express.static(path.join(__dirname, '../Image')));

// Routes
const authRoutes_shihab = require('./routes/auth');
const productRoutes_shihab = require('./routes/products');
const cartRoutes_shihab = require('./routes/cart');
const orderRoutes_shihab = require('./routes/orders');
const adminRoutes_shihab = require('./routes/admin');

app_shihab.get('/api', (req, res) => {
    res.json({ message: 'Online Smartphone Shop API by Shihab' });
});

app_shihab.use('/api/auth', authRoutes_shihab);
app_shihab.use('/api/products', productRoutes_shihab);
app_shihab.use('/api/cart', cartRoutes_shihab);
app_shihab.use('/api/orders', orderRoutes_shihab);
app_shihab.use('/api/admin', adminRoutes_shihab);

// Start server
app_shihab.listen(PORT_SHIHAB, () => {
    console.log(`SmartPhoneShop Server by Shihab running on http://localhost:${PORT_SHIHAB}`);
});

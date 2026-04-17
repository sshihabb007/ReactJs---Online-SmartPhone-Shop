const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('./auth');

// Admin middleware
const adminMiddleware = (req, res, next) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
};

// Get all orders (admin)
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status } = req.query; // 'pending' or 'delivered'
        let sql = 'SELECT `O_ID`, `Email`, `Product`, `Date`, `Stutas`, `Address`, `Payment Type`, `Price` FROM `order`';
        const params = [];
        if (status === 'pending') {
            sql += ' WHERE `Stutas` = ?';
            params.push('not deleverd');
        } else if (status === 'delivered') {
            sql += ' WHERE `Stutas` = ?';
            params.push('deleverd');
        }
        sql += ' ORDER BY `Date` DESC';
        const [orders] = await db.execute(sql, params);
        res.json({ success: true, orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update order status (admin)
router.put('/orders/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body; // 'deleverd' or 'not deleverd'
    try {
        await db.execute('UPDATE `order` SET `Stutas` = ? WHERE `O_ID` = ?', [status, req.params.id]);
        res.json({ success: true, message: 'Order status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all users (admin)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT `First Name` as firstName, `Last Name` as lastName, Email, Phone, Type FROM user');
        res.json({ success: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Add product (admin)
router.post('/products', authMiddleware, adminMiddleware, async (req, res) => {
    const p = req.body;
    try {
        await db.execute(
            `INSERT INTO \`mobile feature\` 
            (Image, Model, Brand, Dimensions, Weight, \`Body Build\`, Sim, Technology, \`Display Type\`, \`Display Size\`, \`Display Protection\`, Multitouch, OS, Chipset, CPU, GPU, \`Card Slort\`, \`Internal Memory\`, \`Primary Camera\`, \`Camera Feature\`, \`Video Quality\`, \`Secondary Camera\`, Alert, Loudspeaker, Quantity, Price) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.image, p.model, p.brand, p.dimensions, p.weight, p.bodyBuild, p.sim, p.technology, p.displayType, p.displaySize, p.displayProtection, p.multitouch, p.os, p.chipset, p.cpu, p.gpu, p.cardSlot, p.internalMemory, p.primaryCamera, p.cameraFeature, p.videoQuality, p.secondaryCamera, p.alert, p.loudspeaker, p.quantity, p.price]
        );
        res.status(201).json({ success: true, message: 'Product added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Dashboard stats (admin)
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [products] = await db.execute('SELECT COUNT(*) as count FROM `mobile feature`');
        const [users] = await db.execute('SELECT COUNT(*) as count FROM user');
        const [pendingOrders] = await db.execute("SELECT COUNT(*) as count FROM `order` WHERE `Stutas` = 'not deleverd'");
        const [deliveredOrders] = await db.execute("SELECT COUNT(*) as count FROM `order` WHERE `Stutas` = 'deleverd'");
        const [revenue] = await db.execute("SELECT SUM(Price) as total FROM `order` WHERE `Stutas` = 'deleverd'");
        res.json({
            success: true,
            stats: {
                totalProducts: products[0].count,
                totalUsers: users[0].count,
                pendingOrders: pendingOrders[0].count,
                deliveredOrders: deliveredOrders[0].count,
                totalRevenue: revenue[0].total || 0
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

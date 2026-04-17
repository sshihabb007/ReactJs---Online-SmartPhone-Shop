const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('./auth');

// Get cart items for logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [items] = await db.execute(
            'SELECT `C_ID`, `M_ID`, `Model`, `Quantity`, `Price`, `TPrice` FROM `chart` WHERE `Email` = ?',
            [req.user.email]
        );
        const [totalRow] = await db.execute(
            'SELECT SUM(`TPrice`) as Total FROM `chart` WHERE `Email` = ?',
            [req.user.email]
        );
        res.json({ success: true, items, total: totalRow[0].Total || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        // Get product info
        const [product] = await db.execute('SELECT Id, Model, Price, Quantity FROM `mobile feature` WHERE Id = ?', [productId]);
        if (product.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });

        const p = product[0];
        if (p.Quantity < 5) return res.status(400).json({ success: false, message: 'Product not available' });

        const totalPrice = p.Price * quantity;

        // Check if already in cart
        const [existing] = await db.execute(
            'SELECT C_ID, Quantity FROM `chart` WHERE Email = ? AND M_ID = ?',
            [req.user.email, productId]
        );

        if (existing.length > 0) {
            const newQty = existing[0].Quantity + quantity;
            const newTotal = p.Price * newQty;
            await db.execute(
                'UPDATE `chart` SET Quantity = ?, TPrice = ? WHERE C_ID = ?',
                [newQty, newTotal, existing[0].C_ID]
            );
        } else {
            await db.execute(
                'INSERT INTO `chart` (M_ID, Email, Model, Quantity, Price, TPrice, Date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())',
                [productId, req.user.email, p.Model, quantity, p.Price, totalPrice]
            );
        }

        res.json({ success: true, message: 'Added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Remove item from cart
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await db.execute('DELETE FROM `chart` WHERE `C_ID` = ? AND `Email` = ?', [req.params.id, req.user.email]);
        res.json({ success: true, message: 'Removed from cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

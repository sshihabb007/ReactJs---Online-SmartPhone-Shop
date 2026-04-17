const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authMiddleware } = require('./auth');

// Get user's orders
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [orders] = await db.execute(
            'SELECT `O_ID`, `Product`, `Date`, `Stutas`, `Address`, `Payment Type`, `Price` FROM `order` WHERE `Email` = ? ORDER BY `Date` DESC',
            [req.user.email]
        );
        res.json({ success: true, orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get order details
router.get('/:id/details', authMiddleware, async (req, res) => {
    try {
        const [details] = await db.execute(
            'SELECT `Model`, `Quantity`, `Price`, `Tprice` FROM `order details` WHERE `O_ID` = ?',
            [req.params.id]
        );
        res.json({ success: true, details });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Place order (checkout)
router.post('/checkout', authMiddleware, async (req, res) => {
    const { address, paymentType } = req.body;
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // Get cart items
        const [cartItems] = await conn.execute(
            'SELECT `M_ID`, `Model`, `Quantity`, `Price`, `TPrice` FROM `chart` WHERE `Email` = ?',
            [req.user.email]
        );

        if (cartItems.length === 0) {
            await conn.rollback();
            conn.release();
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Compute total and product summary string
        let totalPrice = 0;
        let productStr = '';
        for (const item of cartItems) {
            totalPrice += item.TPrice;
            productStr += `${item.Model} [${item.Quantity}] `;
        }

        // Insert into order table
        const [orderResult] = await conn.execute(
            'INSERT INTO `order` (Email, Product, Date, Stutas, Address, `Payment Type`, Price) VALUES (?, ?, CURDATE(), ?, ?, ?, ?)',
            [req.user.email, productStr, 'not deleverd', address, paymentType, totalPrice]
        );
        const orderId = orderResult.insertId;

        // Insert order details for each cart item
        for (const item of cartItems) {
            await conn.execute(
                'INSERT INTO `order details` (O_ID, Model, Quantity, Price, Tprice) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.Model, item.Quantity, item.Price, item.TPrice]
            );
            // Update sold quantity
            await conn.execute(
                'UPDATE `mobile feature` SET `Sold Quantity` = `Sold Quantity` + ? WHERE Id = ?',
                [item.Quantity, item.M_ID]
            );
        }

        // Clear cart
        await conn.execute('DELETE FROM `chart` WHERE `Email` = ?', [req.user.email]);

        await conn.commit();
        conn.release();
        res.json({ success: true, message: 'Order placed successfully', orderId });
    } catch (err) {
        await conn.rollback();
        conn.release();
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

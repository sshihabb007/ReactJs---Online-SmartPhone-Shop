const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products (with optional search query and brand filter)
router.get('/', async (req, res) => {
    try {
        const { search, brand } = req.query;
        let sql = 'SELECT * FROM `mobile feature`';
        const params = [];

        if (search) {
            sql += ' WHERE (`Model` LIKE ? OR `Brand` LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        } else if (brand) {
            sql += ' WHERE `Brand` = ?';
            params.push(brand);
        }

        const [products] = await db.execute(sql, params);
        res.json({ success: true, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get brands list — this must come BEFORE /:id route
router.get('/brands', async (req, res) => {
    try {
        const [brands] = await db.execute('SELECT * FROM brand ORDER BY `Brand Name`');
        res.json({ success: true, brands });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const [product] = await db.execute('SELECT * FROM `mobile feature` WHERE Id = ?', [req.params.id]);
        if (product.length > 0) {
            res.json({ success: true, product: product[0] });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;

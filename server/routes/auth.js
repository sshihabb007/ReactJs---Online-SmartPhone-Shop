const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET_SHIHAB = 'supersecretjwtkeyforonlinephoneshop_shihab_123';

const hashPassword_shihab = (password) => {
    return crypto.createHash('md5').update(password).digest('hex');
};

// JWT auth middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET_SHIHAB);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPass = hashPassword_shihab(password);
        const [rows] = await db.execute(
            'SELECT Email, Type, `First Name` as firstName, `Last Name` as lastName, Phone, Gender, DOB FROM user WHERE Email = ? AND Password = ?',
            [email, hashedPass]
        );
        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign({ email: user.Email, type: user.Type }, JWT_SECRET_SHIHAB, { expiresIn: '24h' });
            res.json({ success: true, token, user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Register
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, gender, dob, password, phone } = req.body;
    try {
        const [existing] = await db.execute('SELECT Email FROM user WHERE Email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        const hashedPass = hashPassword_shihab(password);
        await db.execute(
            'INSERT INTO user (`First Name`, `Last Name`, Email, Gender, DOB, Password, Phone, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, gender, dob, hashedPass, phone, 'user']
        );
        // Auto-login after register
        const token = jwt.sign({ email, type: 'user' }, JWT_SECRET_SHIHAB, { expiresIn: '24h' });
        res.status(201).json({
            success: true, message: 'Registration successful', token,
            user: { Email: email, firstName, lastName, Type: 'user', Phone: phone, Gender: gender, DOB: dob }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get current user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT Email, `First Name` as firstName, `Last Name` as lastName, Phone, Gender, DOB, Type FROM user WHERE Email = ?',
            [req.user.email]
        );
        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
    const { firstName, lastName, phone } = req.body;
    try {
        await db.execute(
            'UPDATE user SET `First Name` = ?, `Last Name` = ?, Phone = ? WHERE Email = ?',
            [firstName, lastName, phone, req.user.email]
        );
        res.json({ success: true, message: 'Profile updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;
module.exports.JWT_SECRET_SHIHAB = JWT_SECRET_SHIHAB;

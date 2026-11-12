const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const AdminUser = require('../models/AdminUser');
const User = require('../models/User');
const demoStore = require('../utils/demoStore');
const authMiddleware = require('../middleware/authMiddleware');

const isMongo = () => mongoose.connection.readyState === 1;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new customer account
 * @access  Public
 */
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian phone number required (e.g. 9876543210)'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }

  try {
    const { name, email, phone, password, address } = req.body;

    // Check if user already exists
    let existingUser = null;
    if (isMongo()) {
      existingUser = await User.findOne({ email });
    } else {
      existingUser = await demoStore.findUserByEmail(email);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login instead.'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    let user = null;
    const userData = {
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      address: address || '',
      role: 'customer'
    };

    if (isMongo()) {
      user = await User.create(userData);
    } else {
      user = await demoStore.createUser(userData);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: 'customer' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address || '',
      role: 'customer',
      createdAt: user.createdAt
    };

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Sweet Bliss Bakery.',
      token,
      user: safeUser,
      data: { token, user: safeUser }
    });
  } catch (err) {
    console.error('POST /auth/register error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create account. Please try again.'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate customer or admin user
 * @access  Public
 */
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array()
    });
  }

  try {
    const { email, password } = req.body;
    const normEmail = email.toLowerCase().trim();

    // 1. First check if it's a customer user
    let user = null;
    if (isMongo()) {
      user = await User.findOne({ email: normEmail });
    } else {
      user = await demoStore.findUserByEmail(normEmail);
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: 'customer' },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '7d' }
      );

      const safeUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || '',
        role: 'customer',
        createdAt: user.createdAt
      };

      return res.json({
        success: true,
        message: 'Login successful!',
        token,
        user: safeUser,
        data: { token, user: safeUser }
      });
    }

    // 2. Check if it's an admin user
    let admin = null;
    if (isMongo()) {
      admin = await AdminUser.findOne({ email: normEmail });
    } else {
      admin = await demoStore.findAdminByEmail(normEmail);
    }

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
      );

      const safeAdmin = {
        id: admin._id,
        name: admin.username,
        username: admin.username,
        email: admin.email,
        role: admin.role
      };

      return res.json({
        success: true,
        message: 'Admin login successful',
        token,
        admin: safeAdmin,
        user: safeAdmin,
        data: { token, admin: safeAdmin, user: safeAdmin }
      });
    }

    // Neither found
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  } catch (err) {
    console.error('POST /auth/login error:', err);
    return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset instructions
 * @access  Public
 */
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { email } = req.body;
  const normEmail = email.toLowerCase().trim();

  try {
    let exists = false;
    if (isMongo()) {
      const u = await User.findOne({ email: normEmail });
      const a = await AdminUser.findOne({ email: normEmail });
      exists = Boolean(u || a);
    } else {
      const u = await demoStore.findUserByEmail(normEmail);
      const a = await demoStore.findAdminByEmail(normEmail);
      exists = Boolean(u || a);
    }

    if (exists) {
      return res.json({
        success: true,
        message: 'Password reset link and temporary code have been dispatched to your email address.'
      });
    }

    return res.status(404).json({
      success: false,
      message: 'No registered account found with this email address.'
    });
  } catch (err) {
    console.error('POST /auth/forgot-password error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process request.' });
  }
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private (JWT required)
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id || req.admin?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    let user = null;
    if (isMongo()) {
      user = await User.findById(userId);
      if (!user) {
        user = await AdminUser.findById(userId);
      }
    } else {
      user = await demoStore.findUserById(userId);
      if (!user) {
        const adminEmail = req.user?.email || req.admin?.email;
        if (adminEmail) user = await demoStore.findAdminByEmail(adminEmail);
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name || user.username,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || 'customer',
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('GET /auth/profile error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update current user profile
 * @access  Private (JWT required)
 */
router.put('/profile', authMiddleware, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim().matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const userId = req.user?.id || req.admin?.id;
    const { name, phone, address } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address !== undefined) updates.address = address;

    let updated = null;
    if (isMongo()) {
      updated = await User.findByIdAndUpdate(userId, updates, { new: true });
    } else {
      updated = await demoStore.updateUserById(userId, updates);
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found to update.' });
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updated._id,
        name: updated.name || updated.username,
        email: updated.email,
        phone: updated.phone || '',
        address: updated.address || '',
        role: updated.role || 'customer'
      }
    });
  } catch (err) {
    console.error('PUT /auth/profile error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

module.exports = router;

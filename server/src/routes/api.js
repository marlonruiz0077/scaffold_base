const express = require('express');
const router = express.Router();
const db = require('../db');

// Health Check Endpoint
router.get('/health', (req, res) => {
  const dbStatus = db.getDbStatus();
  res.json({
    status: 'healthy',
    brand: 'Hamburger Rapid',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    platform: 'Hamburger Rapid Commercial Platform',
    database: dbStatus
  });
});

// List products (10 featured burgers)
router.get('/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new product
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, stock, specialty_badge, specialty_level, image, description, ingredients, calories, prep_time } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, error: 'Nombre y precio son requeridos.' });
    }
    const product = await db.addProduct({
      name,
      category,
      price,
      stock,
      specialty_badge,
      specialty_level,
      image,
      description,
      ingredients,
      calories,
      prep_time
    });
    res.status(201).json({ success: true, message: 'Hamburguesa creada exitosamente', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.json({ success: true, message: `Hamburguesa ${id} eliminada.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Consumer Metrics Endpoint
router.get('/metrics/consumers', (req, res) => {
  try {
    const metrics = db.getConsumersMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Orders Endpoints
router.get('/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/orders', (req, res) => {
  try {
    const { customerName, items, total, address } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'La orden debe contener al menos una hamburguesa.' });
    }
    const order = db.createOrder({ customerName, items, total, address });
    res.status(201).json({
      success: true,
      message: '¡Orden de compra simulada exitosamente!',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset initial products
router.post('/reset', async (req, res) => {
  try {
    await db.resetProducts();
    res.json({ success: true, message: 'Catálogo de Hamburger Rapid restablecido.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const path = require('path');
const { products, categories, testimonials, galleryImages, customOptions, statistics, footerData } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    const { category, sort, minPrice, maxPrice, featured, limit } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p =>
            p.category.toLowerCase().replace(' ', '-') === category.toLowerCase()
        );
    }

    // Filter by price range
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
    }

    // Filter featured only
    if (featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured);
    }

    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
            break;
        default:
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Limit results
    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    // Get related products
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    res.json({
        success: true,
        data: {
            ...product,
            relatedProducts
        }
    });
});

// Get categories
app.get('/api/categories', (req, res) => {
    res.json({
        success: true,
        data: categories
    });
});

// Get testimonials
app.get('/api/testimonials', (req, res) => {
    res.json({
        success: true,
        data: testimonials
    });
});

// Get gallery images
app.get('/api/gallery', (req, res) => {
    const { category } = req.query;

    let filteredImages = [...galleryImages];

    if (category && category !== 'all') {
        filteredImages = filteredImages.filter(img =>
            img.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json({
        success: true,
        data: filteredImages
    });
});

// Get custom furniture options
app.get('/api/custom-options', (req, res) => {
    res.json({
        success: true,
        data: customOptions
    });
});

// Get statistics
app.get('/api/statistics', (req, res) => {
    res.json({
        success: true,
        data: statistics
    });
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    // Log the contact form submission (in production, this would be stored or emailed)
    console.log('\n====================================');
    console.log('📧 NEW CONTACT FORM SUBMISSION');
    console.log('====================================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || 'Not provided'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('====================================\n');

    res.json({
        success: true,
        message: 'Thank you for your message. We will get back to you within 24 hours.'
    });
});

// Handle custom furniture request
app.post('/api/custom-request', (req, res) => {
    const { name, email, phone, furnitureType, woodType, fabric, size, budget, description } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !furnitureType || !woodType || !size || !budget || !description) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    // Log the custom request (in production, this would be stored in a database)
    console.log('\n====================================');
    console.log('🪑 NEW CUSTOM FURNITURE REQUEST');
    console.log('====================================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Furniture Type: ${furnitureType}`);
    console.log(`Wood Type: ${woodType}`);
    console.log(`Fabric: ${fabric || 'Not applicable'}`);
    console.log(`Size: ${size}`);
    console.log(`Budget: ${budget}`);
    console.log(`Description: ${description}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('====================================\n');

    res.json({
        success: true,
        message: 'Your custom furniture request has been submitted. Our design team will contact you within 24-48 hours.'
    });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide an email address'
        });
    }

    console.log(`📨 Newsletter subscription: ${email}`);

    res.json({
        success: true,
        message: 'Thank you for subscribing! You will receive our latest updates and exclusive offers.'
    });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🪑  LUXE LIVING API SERVER                         ║
║                                                       ║
║   Server running on: http://localhost:${PORT}          ║
║   Environment: ${process.env.NODE_ENV || 'development'}                        ║
║                                                       ║
║   Available endpoints:                                ║
║   • GET  /api/products       - Get all products       ║
║   • GET  /api/products/:id   - Get single product     ║
║   • GET  /api/categories     - Get categories         ║
║   • GET  /api/testimonials   - Get testimonials       ║
║   • GET  /api/gallery        - Get gallery images     ║
║   • GET  /api/custom-options - Get custom options     ║
║   • GET  /api/statistics     - Get statistics         ║
║   • POST /api/contact        - Submit contact form    ║
║   • POST /api/custom-request - Submit custom request  ║
║   • POST /api/newsletter     - Newsletter signup      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

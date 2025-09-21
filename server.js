const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(uploadsDir, req.body.userId || 'temp');
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images, PDFs, and documents are allowed!'));
        }
    }
});

// Initialize SQLite database
const dbPath = path.join(__dirname, '../database/farmtrace_real.db');
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        user_type TEXT NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Farmer profiles table
    db.run(`CREATE TABLE IF NOT EXISTS farmer_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        farm_address TEXT NOT NULL,
        farm_size REAL NOT NULL,
        primary_crops TEXT NOT NULL,
        farming_experience INTEGER,
        aadhaar_number TEXT,
        pan_number TEXT,
        bank_account TEXT,
        ifsc_code TEXT,
        kyc_status TEXT DEFAULT 'PENDING',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Documents table for KYC uploads
    db.run(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        document_type TEXT NOT NULL,
        original_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        verification_status TEXT DEFAULT 'PENDING',
        verified_by INTEGER,
        verification_date DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farmer_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        variety TEXT,
        quantity_kg REAL NOT NULL,
        price_per_kg REAL,
        quality_grade TEXT,
        harvest_date DATE,
        is_organic BOOLEAN DEFAULT FALSE,
        description TEXT,
        image_path TEXT,
        blockchain_hash TEXT,
        qr_code TEXT,
        status TEXT DEFAULT 'AVAILABLE',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (farmer_id) REFERENCES users(id)
    )`);

    // Transactions table
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        buyer_id INTEGER NOT NULL,
        seller_id INTEGER NOT NULL,
        quantity_kg REAL NOT NULL,
        price_per_kg REAL NOT NULL,
        total_amount REAL NOT NULL,
        transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        payment_status TEXT DEFAULT 'PENDING',
        delivery_status TEXT DEFAULT 'PENDING',
        blockchain_hash TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (buyer_id) REFERENCES users(id),
        FOREIGN KEY (seller_id) REFERENCES users(id)
    )`);

    // Notifications table
    db.run(`CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'INFO',
        is_read BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
});

// JWT secret key
const JWT_SECRET = 'farmtrace_sih2025_secret_key_super_secure';

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// API Routes

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        if (!email || !password || !userType) {
            return res.status(400).json({ error: 'Email, password, and user type are required' });
        }

        // Check if user already exists
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (row) {
                return res.status(400).json({ error: 'User already exists with this email' });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user
            db.run(
                'INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)',
                [email, hashedPassword, userType],
                function(err) {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({ error: 'Failed to create user' });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { userId: this.lastID, email, userType },
                        JWT_SECRET,
                        { expiresIn: '24h' }
                    );

                    res.status(201).json({
                        message: 'User registered successfully',
                        userId: this.lastID,
                        token,
                        userType
                    });
                }
            );
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        try {
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email, userType: user.user_type },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                userId: user.id,
                token,
                userType: user.user_type,
                isVerified: user.is_verified
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Farmer Profile Creation/Update
app.post('/api/farmer/profile', authenticateToken, (req, res) => {
    if (req.user.userType !== 'FARMER') {
        return res.status(403).json({ error: 'Only farmers can access this endpoint' });
    }

    const {
        fullName, phone, farmAddress, farmSize, primaryCrops,
        farmingExperience, aadhaarNumber, panNumber, bankAccount, ifscCode
    } = req.body;

    const query = `
        INSERT OR REPLACE INTO farmer_profiles
        (user_id, full_name, phone, farm_address, farm_size, primary_crops,
         farming_experience, aadhaar_number, pan_number, bank_account, ifsc_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        req.user.userId, fullName, phone, farmAddress, farmSize, primaryCrops,
        farmingExperience, aadhaarNumber, panNumber, bankAccount, ifscCode
    ], function(err) {
        if (err) {
            console.error('Error saving farmer profile:', err);
            return res.status(500).json({ error: 'Failed to save profile' });
        }

        res.json({
            message: 'Farmer profile saved successfully',
            profileId: this.lastID || this.changes
        });
    });
});

// Document Upload
app.post('/api/upload/document', authenticateToken, upload.single('document'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { documentType } = req.body;

    if (!documentType) {
        return res.status(400).json({ error: 'Document type is required' });
    }

    const query = `
        INSERT INTO documents
        (user_id, document_type, original_name, file_path, file_size)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [
        req.user.userId,
        documentType,
        req.file.originalname,
        req.file.path,
        req.file.size
    ], function(err) {
        if (err) {
            console.error('Error saving document:', err);
            return res.status(500).json({ error: 'Failed to save document' });
        }

        res.json({
            message: 'Document uploaded successfully',
            documentId: this.lastID,
            fileName: req.file.filename,
            originalName: req.file.originalname,
            fileSize: req.file.size
        });
    });
});

// Get User Profile
app.get('/api/profile', authenticateToken, (req, res) => {
    let query = 'SELECT * FROM users WHERE id = ?';
    let joinQuery = '';

    if (req.user.userType === 'FARMER') {
        query = `
            SELECT u.*, fp.full_name, fp.phone, fp.farm_address, fp.farm_size,
                   fp.primary_crops, fp.farming_experience, fp.kyc_status
            FROM users u
            LEFT JOIN farmer_profiles fp ON u.id = fp.user_id
            WHERE u.id = ?
        `;
    }

    db.get(query, [req.user.userId], (err, profile) => {
        if (err) {
            console.error('Error fetching profile:', err);
            return res.status(500).json({ error: 'Failed to fetch profile' });
        }

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Remove password from response
        delete profile.password;

        res.json(profile);
    });
});

// Get User Documents
app.get('/api/documents', authenticateToken, (req, res) => {
    const query = `
        SELECT id, document_type, original_name, file_size, upload_date,
               verification_status, verification_date
        FROM documents
        WHERE user_id = ?
        ORDER BY upload_date DESC
    `;

    db.all(query, [req.user.userId], (err, documents) => {
        if (err) {
            console.error('Error fetching documents:', err);
            return res.status(500).json({ error: 'Failed to fetch documents' });
        }

        res.json(documents);
    });
});

// Add Product
app.post('/api/products', authenticateToken, upload.single('productImage'), (req, res) => {
    if (req.user.userType !== 'FARMER') {
        return res.status(403).json({ error: 'Only farmers can add products' });
    }

    const {
        productName, variety, quantityKg, pricePerKg, qualityGrade,
        harvestDate, isOrganic, description
    } = req.body;

    const imagePath = req.file ? req.file.path : null;
    const qrCode = `QR_${Date.now()}_${req.user.userId}`;

    const query = `
        INSERT INTO products
        (farmer_id, product_name, variety, quantity_kg, price_per_kg, quality_grade,
         harvest_date, is_organic, description, image_path, qr_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        req.user.userId, productName, variety, quantityKg, pricePerKg, qualityGrade,
        harvestDate, isOrganic === 'true', description, imagePath, qrCode
    ], function(err) {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Failed to add product' });
        }

        res.json({
            message: 'Product added successfully',
            productId: this.lastID,
            qrCode
        });
    });
});

// Get Products
app.get('/api/products', authenticateToken, (req, res) => {
    let query = `
        SELECT p.*, u.email as farmer_email, fp.full_name as farmer_name
        FROM products p
        JOIN users u ON p.farmer_id = u.id
        LEFT JOIN farmer_profiles fp ON u.id = fp.user_id
    `;

    let params = [];

    if (req.user.userType === 'FARMER') {
        query += ' WHERE p.farmer_id = ?';
        params = [req.user.userId];
    }

    query += ' ORDER BY p.created_at DESC';

    db.all(query, params, (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }

        res.json(products);
    });
});

// Get Notifications
app.get('/api/notifications', authenticateToken, (req, res) => {
    const query = `
        SELECT * FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 20
    `;

    db.all(query, [req.user.userId], (err, notifications) => {
        if (err) {
            console.error('Error fetching notifications:', err);
            return res.status(500).json({ error: 'Failed to fetch notifications' });
        }

        res.json(notifications);
    });
});

// Create Notification
app.post('/api/notifications', authenticateToken, (req, res) => {
    const { userId, title, message, type = 'INFO' } = req.body;

    const query = `
        INSERT INTO notifications (user_id, title, message, type)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [userId, title, message, type], function(err) {
        if (err) {
            console.error('Error creating notification:', err);
            return res.status(500).json({ error: 'Failed to create notification' });
        }

        res.json({
            message: 'Notification created successfully',
            notificationId: this.lastID
        });
    });
});

// Dashboard Stats
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
    if (req.user.userType === 'FARMER') {
        // Farmer dashboard stats
        const queries = {
            products: 'SELECT COUNT(*) as count FROM products WHERE farmer_id = ?',
            totalRevenue: 'SELECT SUM(total_amount) as revenue FROM transactions WHERE seller_id = ? AND payment_status = "COMPLETED"',
            pendingOrders: 'SELECT COUNT(*) as count FROM transactions WHERE seller_id = ? AND delivery_status = "PENDING"'
        };

        const stats = {};
        let completed = 0;

        Object.keys(queries).forEach(key => {
            db.get(queries[key], [req.user.userId], (err, result) => {
                if (err) {
                    console.error(`Error fetching ${key}:`, err);
                } else {
                    stats[key] = result.count || result.revenue || 0;
                }

                completed++;
                if (completed === Object.keys(queries).length) {
                    res.json(stats);
                }
            });
        });
    } else {
        res.json({ message: 'Dashboard stats not implemented for this user type' });
    }
});

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/farmtrace_app.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🌾 FarmTrace Server running on http://localhost:${PORT}`);
    console.log('📱 Real Web Application ready for SIH 2025 judges!');
    console.log('🚀 Features: Real file uploads, authentication, database operations');
});

module.exports = app;
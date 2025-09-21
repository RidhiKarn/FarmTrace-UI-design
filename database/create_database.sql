-- FarmTrace Database Schema for SIH 2025 Problem Statement #25045
-- Complete database structure for all 11 user types

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT UNIQUE NOT NULL,
    user_type TEXT NOT NULL CHECK (user_type IN ('FARMER', 'MIDDLEMAN', 'FIELD_AGENT', 'TRANSPORTER', 'RETAILER', 'CONSUMER', 'CORPORATE_BUYER', 'BANK', 'MANDI_OFFICIAL', 'GOVERNMENT', 'CERTIFICATION_BODY')),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    kyc_status TEXT DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farmers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    farm_location TEXT NOT NULL,
    farm_size_hectares REAL,
    certification_type TEXT,
    is_organic BOOLEAN DEFAULT TRUE,
    primary_crops TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_code TEXT UNIQUE NOT NULL,
    farmer_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    variety TEXT,
    quantity_kg REAL NOT NULL,
    unit_price REAL,
    harvest_date DATE,
    quality_grade TEXT,
    is_organic BOOLEAN DEFAULT TRUE,
    blockchain_hash TEXT,
    qr_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);

CREATE TABLE IF NOT EXISTS supply_chain_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    step_order INTEGER NOT NULL,
    is_automated BOOLEAN DEFAULT FALSE,
    requires_user_confirmation BOOLEAN DEFAULT TRUE
);

-- Sample Data for Demo
INSERT INTO users VALUES
(1, '0x123...farmer1', 'FARMER', 'Rajesh Kumar', 'rajesh@farm.com', '+91-9876543210', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(2, '0x456...middle1', 'MIDDLEMAN', 'Amit Trader', 'amit@trade.com', '+91-9876543211', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(3, '0x789...agent1', 'FIELD_AGENT', 'Priya Sharma', 'priya@gov.in', '+91-9876543212', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(4, '0xabc...trans1', 'TRANSPORTER', 'Ravi Transport', 'ravi@logistics.com', '+91-9876543213', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(5, '0xdef...retail1', 'RETAILER', 'Sunita Store', 'sunita@market.com', '+91-9876543214', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(6, '0xghi...corp1', 'CORPORATE_BUYER', 'BigMart Corporate', 'orders@bigmart.com', '+91-9876543215', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(7, '0xjkl...consumer1', 'CONSUMER', 'Priya Consumer', 'priya.consumer@gmail.com', '+91-9876543216', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(8, '0xmno...bank1', 'BANK', 'SBI Bank Manager', 'manager@sbibank.com', '+91-9876543217', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(9, '0xpqr...mandi1', 'MANDI_OFFICIAL', 'Mandi Official Kumar', 'official@mandibhubaneswar.gov.in', '+91-9876543218', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(10, '0xstu...gov1', 'GOVERNMENT', 'Agri Secretary Mishra', 'secretary@agricultureodisha.gov.in', '+91-9876543219', 1, 'COMPLETED', '2024-09-10 08:00:00'),
(11, '0xvwx...cert1', 'CERTIFICATION_BODY', 'Organic India Certifier', 'admin@organicindia.org', '+91-9876543220', 1, 'COMPLETED', '2024-09-10 08:00:00');

INSERT INTO farmers VALUES (1, 1, 'Village Khetpur, Odisha', 2.5, 'Organic India Certified', 1, 'Tomatoes, Onions, Potatoes, Rice, Wheat');

INSERT INTO products VALUES
(1, 'FARM001-TOM-2024-001', 1, 'Tomatoes', 'Desi Red', 500, 45.50, '2024-09-10', 'Grade A', 1, '0xa1b2c3d4...', 'QR_TOM_001', '2024-09-10 10:00:00'),
(2, 'FARM001-ONI-2024-001', 1, 'Onions', 'Red Onion', 300, 28.75, '2024-09-08', 'Grade A', 1, '0xb2c3d4e5...', 'QR_ONI_001', '2024-09-08 10:00:00'),
(3, 'FARM001-RIC-2024-001', 1, 'Basmati Rice', 'Premium', 1000, 85.00, '2024-09-05', 'Grade A', 1, '0xc3d4e5f6...', 'QR_RIC_001', '2024-09-05 10:00:00');

INSERT INTO supply_chain_steps VALUES
(1, 'Farmer Registration & KYC', 'Complete KYC verification and farm registration', 1, 1, 1),
(2, 'Harvest Recording', 'Record harvest details and create product batches', 2, 1, 1),
(3, 'Field Agent Inspection', 'Physical inspection and quality verification', 3, 0, 1),
(4, 'Middleman Purchase', 'Purchase transaction recording', 4, 0, 1),
(5, 'Transport Initiation', 'Begin product transportation', 5, 1, 1),
(6, 'GPS Tracking', 'Real-time location monitoring', 6, 1, 0),
(7, 'Retailer Receipt', 'Product delivery and verification', 7, 0, 1),
(8, 'Consumer QR Generation', 'Generate consumer-facing QR codes', 8, 1, 1),
(9, 'Consumer Purchase', 'Final consumer transaction', 9, 0, 1),
(10, 'Blockchain Recording', 'All transactions recorded on blockchain', 10, 1, 0);
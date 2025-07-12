-- Smart Recycle Nexus Database Schema
-- Database: userData58

USE userData58;

-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'India',
    is_admin BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Recycling categories
CREATE TABLE IF NOT EXISTS recycling_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    points_per_kg DECIMAL(10,2) DEFAULT 0.00,
    icon VARCHAR(100),
    color VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pickup requests
CREATE TABLE IF NOT EXISTS pickup_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time_slot VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    special_instructions TEXT,
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    total_weight DECIMAL(10,2) DEFAULT 0.00,
    total_points DECIMAL(10,2) DEFAULT 0.00,
    assigned_driver_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Items in pickup requests
CREATE TABLE IF NOT EXISTS pickup_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pickup_request_id INT NOT NULL,
    category_id INT NOT NULL,
    estimated_weight DECIMAL(10,2) NOT NULL,
    actual_weight DECIMAL(10,2) DEFAULT 0.00,
    points_earned DECIMAL(10,2) DEFAULT 0.00,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pickup_request_id) REFERENCES pickup_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES recycling_categories(id)
);

-- User rewards and points
CREATE TABLE IF NOT EXISTS user_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_points DECIMAL(10,2) DEFAULT 0.00,
    points_used DECIMAL(10,2) DEFAULT 0.00,
    points_available DECIMAL(10,2) DEFAULT 0.00,
    total_weight_recycled DECIMAL(10,2) DEFAULT 0.00,
    carbon_footprint_saved DECIMAL(10,2) DEFAULT 0.00,
    trees_saved INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_reward (user_id)
);

-- Reward redemption history
CREATE TABLE IF NOT EXISTS reward_redemptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    points_used DECIMAL(10,2) NOT NULL,
    reward_type VARCHAR(100) NOT NULL,
    reward_description TEXT,
    redemption_code VARCHAR(100),
    status ENUM('pending', 'processed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Environmental impact tracking
CREATE TABLE IF NOT EXISTS environmental_impact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pickup_request_id INT,
    weight_recycled DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    co2_saved DECIMAL(10,2) DEFAULT 0.00,
    energy_saved DECIMAL(10,2) DEFAULT 0.00,
    water_saved DECIMAL(10,2) DEFAULT 0.00,
    impact_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pickup_request_id) REFERENCES pickup_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES recycling_categories(id)
);

-- Nearby recycling centers
CREATE TABLE IF NOT EXISTS recycling_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    operating_hours TEXT,
    accepted_materials TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Drivers for pickup services
CREATE TABLE IF NOT EXISTS drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    license_number VARCHAR(50),
    vehicle_type VARCHAR(100),
    vehicle_number VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- System settings
CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default recycling categories
INSERT IGNORE INTO recycling_categories (name, description, points_per_kg, icon, color) VALUES
('Paper & Cardboard', 'Newspapers, magazines, cardboard boxes, office paper', 2.00, 'FileText', '#8B4513'),
('Plastic Bottles', 'PET bottles, plastic containers, food packaging', 3.00, 'Bottle', '#4169E1'),
('Glass', 'Glass bottles, jars, containers', 2.50, 'Wine', '#228B22'),
('Metal Cans', 'Aluminum cans, tin cans, metal containers', 4.00, 'Package', '#C0C0C0'),
('Electronics', 'Mobile phones, computers, batteries, small appliances', 10.00, 'Smartphone', '#FF4500'),
('Organic Waste', 'Food scraps, garden waste, compostable materials', 1.50, 'Leaf', '#32CD32'),
('Textiles', 'Old clothes, fabrics, shoes', 2.50, 'Shirt', '#DDA0DD'),
('Hazardous Waste', 'Chemicals, paints, oils, fluorescent bulbs', 5.00, 'AlertTriangle', '#FF0000');

-- Insert default system settings
INSERT IGNORE INTO system_settings (setting_key, setting_value, description) VALUES
('points_to_currency_rate', '0.10', 'Rate for converting points to currency (1 point = 0.10 INR)'),
('minimum_pickup_weight', '5.00', 'Minimum weight in kg required for pickup service'),
('pickup_service_radius', '25', 'Service radius in kilometers'),
('co2_saved_per_kg', '2.5', 'Average CO2 saved per kg of recycled material'),
('admin_email', 'admin@smartrecyclenexus.com', 'Admin email for notifications'),
('company_name', 'Smart Recycle Nexus', 'Company name'),
('contact_phone', '+91-9876543210', 'Contact phone number');

-- Sample data for Smart Recycle Nexus
-- Insert sample recycling centers
USE userData58;

INSERT INTO recycling_centers (name, address, city, state, postal_code, phone, email, latitude, longitude, operating_hours, accepted_materials) VALUES
('Green Earth Recycling Center', '123 Environmental Way, Sector 15', 'Delhi', 'Delhi', '110001', '+91-11-12345678', 'info@greenearth.com', 28.6139, 77.2090, 'Mon-Sat: 9AM-6PM', 'Paper, Plastic, Glass, Metal'),
('EcoWaste Solutions', '456 Recycle Street, Banjara Hills', 'Hyderabad', 'Telangana', '500034', '+91-40-87654321', 'contact@ecowaste.com', 17.4065, 78.4772, 'Mon-Fri: 8AM-7PM, Sat: 9AM-5PM', 'Electronics, Hazardous Waste, Metal'),
('Mumbai Recycling Hub', '789 Clean City Road, Andheri East', 'Mumbai', 'Maharashtra', '400069', '+91-22-11223344', 'hub@mumbairecycle.com', 19.1136, 72.8697, 'Daily: 7AM-8PM', 'All materials accepted'),
('Bangalore Green Center', '321 Tech Park Avenue, Whitefield', 'Bangalore', 'Karnataka', '560066', '+91-80-99887766', 'green@bangalorerecycle.com', 12.9698, 77.7500, 'Mon-Sat: 8AM-6PM', 'Paper, Plastic, Electronics'),
('Chennai Eco Point', '654 Marina Beach Road, T.Nagar', 'Chennai', 'Tamil Nadu', '600017', '+91-44-55667788', 'eco@chennapoint.com', 13.0827, 80.2707, 'Mon-Sun: 9AM-7PM', 'Glass, Metal, Textiles');

-- Insert sample drivers
INSERT INTO drivers (name, phone, email, license_number, vehicle_type, vehicle_number, current_location_lat, current_location_lng) VALUES
('Raj Kumar', '+91-9876543210', 'raj.kumar@smartrecycle.com', 'DL123456789', 'Pickup Truck', 'DL-01-AB-1234', 28.6139, 77.2090),
('Suresh Patel', '+91-9876543211', 'suresh.patel@smartrecycle.com', 'MH098765432', 'Van', 'MH-01-CD-5678', 19.1136, 72.8697),
('Arjun Singh', '+91-9876543212', 'arjun.singh@smartrecycle.com', 'KA567890123', 'Truck', 'KA-02-EF-9012', 12.9698, 77.7500),
('Vikram Reddy', '+91-9876543213', 'vikram.reddy@smartrecycle.com', 'TS234567890', 'Mini Truck', 'TS-03-GH-3456', 17.4065, 78.4772),
('Mohan Das', '+91-9876543214', 'mohan.das@smartrecycle.com', 'TN345678901', 'Pickup Van', 'TN-04-IJ-7890', 13.0827, 80.2707);

-- Verify recycling categories were inserted
SELECT * FROM recycling_categories;

-- Verify system settings were inserted
SELECT * FROM system_settings;

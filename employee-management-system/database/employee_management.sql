CREATE DATABASE IF NOT EXISTS employee_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'ems_user'@'localhost' IDENTIFIED BY 'change_me';
GRANT SELECT, INSERT, UPDATE, DELETE ON employee_management.* TO 'ems_user'@'localhost';
USE employee_management;
CREATE TABLE IF NOT EXISTS admins (
 admin_id BIGINT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(80) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS employees (
 employee_id BIGINT PRIMARY KEY AUTO_INCREMENT, full_name VARCHAR(120) NOT NULL,
 email VARCHAR(160) NOT NULL UNIQUE, phone VARCHAR(30) NOT NULL, department VARCHAR(80) NOT NULL,
 designation VARCHAR(100) NOT NULL, salary DECIMAL(12,2) NOT NULL,
 joining_date DATE NOT NULL, employment_status ENUM('Active','On Leave','Inactive') NOT NULL DEFAULT 'Active',
 address VARCHAR(500), created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_employee_name(full_name), INDEX idx_employee_department(department),
 INDEX idx_employee_status(employment_status), INDEX idx_employee_joining(joining_date)
);
-- Development-only account. Change it before any real deployment.
-- Password: Admin@123 (BCrypt hash)
INSERT INTO admins(username, password_hash) VALUES ('admin', '$2a$10$QRczn3Zbx2lBGifOQG7AGeGoGfyyqFjQpdnKiDttR7Zs8gZN75HhS') ON DUPLICATE KEY UPDATE username=username;
INSERT INTO employees(full_name,email,phone,department,designation,salary,joining_date,employment_status,address) VALUES
('Aarav Mehta','aarav.mehta@example.com','+91 98765 43210','Engineering','Senior Java Developer',95000,'2023-04-10','Active','Bengaluru, Karnataka'),
('Ananya Rao','ananya.rao@example.com','+91 98765 43111','Human Resources','HR Executive',68000,'2024-01-15','Active','Hyderabad, Telangana'),
('Rohan Kapoor','rohan.kapoor@example.com','+91 98765 43002','Design','Product Designer',82000,'2022-09-01','On Leave','Pune, Maharashtra')
ON DUPLICATE KEY UPDATE email=email;

CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(120) NOT NULL,
	`email` varchar(160) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`department` varchar(80) NOT NULL,
	`designation` varchar(100) NOT NULL,
	`salary` decimal(12,2) NOT NULL,
	`joiningDate` varchar(10) NOT NULL,
	`employmentStatus` enum('Active','On Leave','Inactive') NOT NULL DEFAULT 'Active',
	`address` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin') NOT NULL DEFAULT 'admin';
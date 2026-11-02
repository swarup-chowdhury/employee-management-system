ALTER TABLE `employees` DROP INDEX `employees_email_unique`;--> statement-breakpoint
ALTER TABLE `employees` ADD `ownerId` int;--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255);--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_owner_email_idx` UNIQUE(`ownerId`,`email`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);
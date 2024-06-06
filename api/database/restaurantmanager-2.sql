CREATE TABLE IF NOT EXISTS `roles` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`role_name` varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `employees` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`username` varchar(50) NOT NULL UNIQUE,
	`password` char(60) NOT NULL,
	`role_id` int NOT NULL,
	`email` varchar(100) NOT NULL,
	`tel` varchar(50) NOT NULL,
	`status` tinyint NOT NULL,
	`roster_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categories` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`cat_name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `dishes` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(50) NOT NULL,
	`desc` varchar(700) NOT NULL,
	`cat_id` int NOT NULL,
	`allerg` varchar(100),
	`price` decimal(10,0) NOT NULL,
	`cost` decimal(10,0) NOT NULL,
	`min` int NOT NULL,
	`img` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `drinks` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(50) NOT NULL,
	`cat_id` int NOT NULL,
	`price` decimal(10,0) NOT NULL,
	`cost` decimal(10,0) NOT NULL,
	`min` int NOT NULL,
	`img` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `orders` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`date` timestamp NOT NULL,
	`employee_id` int NOT NULL,
	`people` int NOT NULL,
	`validated` tinyint NOT NULL,
	`total` decimal(10,0) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `order_dishes` (
	`order_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`dish_id` int NOT NULL,
	`quantity` int NOT NULL,
	PRIMARY KEY (`order_id`)
);

CREATE TABLE IF NOT EXISTS `order_drinks` (
	`order_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`drink_id` int NOT NULL,
	`quantity` int NOT NULL,
	PRIMARY KEY (`order_id`)
);

CREATE TABLE IF NOT EXISTS `bookings` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`date` date NOT NULL,
	`hour` varchar(30) NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`people` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `rosters` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`roster` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `employees` ADD CONSTRAINT `employees_fk3` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`);

ALTER TABLE `employees` ADD CONSTRAINT `employees_fk7` FOREIGN KEY (`roster_id`) REFERENCES `rosters`(`id`);

ALTER TABLE `dishes` ADD CONSTRAINT `dishes_fk3` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`id`);
ALTER TABLE `drinks` ADD CONSTRAINT `drinks_fk2` FOREIGN KEY (`cat_id`) REFERENCES `categories`(`id`);
ALTER TABLE `orders` ADD CONSTRAINT `orders_fk2` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`);
ALTER TABLE `order_dishes` ADD CONSTRAINT `order_dishes_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `order_dishes` ADD CONSTRAINT `order_dishes_fk1` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`);
ALTER TABLE `order_drinks` ADD CONSTRAINT `order_drinks_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `order_drinks` ADD CONSTRAINT `order_drinks_fk1` FOREIGN KEY (`drink_id`) REFERENCES `drinks`(`id`);


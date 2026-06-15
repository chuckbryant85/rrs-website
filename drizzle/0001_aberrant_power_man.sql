CREATE TABLE `discovery_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactName` varchar(255),
	`contactEmail` varchar(320),
	`contactCompany` varchar(255),
	`answersJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `discovery_submissions_id` PRIMARY KEY(`id`)
);

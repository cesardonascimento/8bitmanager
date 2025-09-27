CREATE TABLE `platforms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text,
	`name` text NOT NULL,
	`releasedGames` text,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `platforms_slug_unique` ON `platforms` (`slug`);
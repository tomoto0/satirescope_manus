ALTER TABLE `posted_tweets` ADD `tweet_id` varchar(64);--> statement-breakpoint
ALTER TABLE `posted_tweets` ADD `like_count` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posted_tweets` ADD `retweet_count` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posted_tweets` ADD `reply_count` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posted_tweets` ADD `impression_count` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `posted_tweets` ADD `engagement_updated_at` timestamp;
-- OJ monetization tables (run after 0000_sticky_satana)
CREATE TYPE "public"."oj_access" AS ENUM('public', 'supporters');--> statement-breakpoint
CREATE TYPE "public"."oj_media_kind" AS ENUM('video', 'audio', 'animation', 'text');--> statement-breakpoint
CREATE TABLE "oj_creators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"username" text NOT NULL,
	"display_name" text NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"city" text DEFAULT '' NOT NULL,
	"tier_name" text DEFAULT 'Backstage' NOT NULL,
	"tier_price_cents" integer DEFAULT 900 NOT NULL,
	"avatar_url" text,
	"banner_hue" integer DEFAULT 200 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "oj_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creator_id" uuid NOT NULL,
	"kind" "oj_media_kind" NOT NULL,
	"access" "oj_access" DEFAULT 'public' NOT NULL,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"media_url" text,
	"poster_url" text,
	"duration_label" text,
	"tip_total_cents" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "oj_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fan_user_id" text NOT NULL,
	"creator_id" uuid NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"stripe_sub_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "oj_tips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fan_user_id" text,
	"creator_id" uuid NOT NULL,
	"post_id" uuid,
	"amount_cents" integer NOT NULL,
	"stripe_payment_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "oj_creators" ADD CONSTRAINT "oj_creators_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_posts" ADD CONSTRAINT "oj_posts_creator_id_oj_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."oj_creators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_subscriptions" ADD CONSTRAINT "oj_subscriptions_fan_user_id_user_id_fk" FOREIGN KEY ("fan_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_subscriptions" ADD CONSTRAINT "oj_subscriptions_creator_id_oj_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."oj_creators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_tips" ADD CONSTRAINT "oj_tips_fan_user_id_user_id_fk" FOREIGN KEY ("fan_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_tips" ADD CONSTRAINT "oj_tips_creator_id_oj_creators_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."oj_creators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oj_tips" ADD CONSTRAINT "oj_tips_post_id_oj_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."oj_posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "oj_creators_username_idx" ON "oj_creators" USING btree ("username");--> statement-breakpoint
CREATE INDEX "oj_posts_created_at_idx" ON "oj_posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "oj_posts_creator_created_idx" ON "oj_posts" USING btree ("creator_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "oj_subscriptions_fan_creator_idx" ON "oj_subscriptions" USING btree ("fan_user_id","creator_id");--> statement-breakpoint
CREATE INDEX "oj_tips_creator_created_idx" ON "oj_tips" USING btree ("creator_id","created_at");

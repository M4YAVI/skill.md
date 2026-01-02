CREATE TABLE "manifesto_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"category" text NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"copies" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

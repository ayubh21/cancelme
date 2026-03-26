BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add UUID shadow columns
ALTER TABLE "category"
  ADD COLUMN "id_uuid" uuid DEFAULT gen_random_uuid();

ALTER TABLE "subscription"
  ADD COLUMN "id_uuid" uuid DEFAULT gen_random_uuid(),
  ADD COLUMN "category_id_uuid" uuid;

ALTER TABLE "plaid_access_token"
  ADD COLUMN "id_uuid" uuid DEFAULT gen_random_uuid();

-- Backfill UUID values for existing rows
UPDATE "category"
SET "id_uuid" = gen_random_uuid()
WHERE "id_uuid" IS NULL;

UPDATE "subscription"
SET "id_uuid" = gen_random_uuid()
WHERE "id_uuid" IS NULL;

UPDATE "plaid_access_token"
SET "id_uuid" = gen_random_uuid()
WHERE "id_uuid" IS NULL;

-- Map subscription.category_id (text) -> category.id_uuid
UPDATE "subscription" s
SET "category_id_uuid" = c."id_uuid"
FROM "category" c
WHERE s."category_id" = c."id";

-- Drop old constraints before swapping columns
ALTER TABLE "subscription" DROP CONSTRAINT IF EXISTS "subscription_category_id_category_id_fk";
ALTER TABLE "subscription" DROP CONSTRAINT IF EXISTS "subscription_pkey";
ALTER TABLE "category" DROP CONSTRAINT IF EXISTS "category_pkey";
ALTER TABLE "plaid_access_token" DROP CONSTRAINT IF EXISTS "plaid_access_token_pkey";

-- Swap id columns
ALTER TABLE "category" RENAME COLUMN "id" TO "id_old";
ALTER TABLE "category" RENAME COLUMN "id_uuid" TO "id";

ALTER TABLE "subscription" RENAME COLUMN "id" TO "id_old";
ALTER TABLE "subscription" RENAME COLUMN "id_uuid" TO "id";
ALTER TABLE "subscription" RENAME COLUMN "category_id" TO "category_id_old";
ALTER TABLE "subscription" RENAME COLUMN "category_id_uuid" TO "category_id";

ALTER TABLE "plaid_access_token" RENAME COLUMN "id" TO "id_old";
ALTER TABLE "plaid_access_token" RENAME COLUMN "id_uuid" TO "id";

-- Recreate constraints with UUID columns
ALTER TABLE "category"
  ALTER COLUMN "id" SET NOT NULL,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

ALTER TABLE "subscription"
  ALTER COLUMN "id" SET NOT NULL,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ALTER COLUMN "category_id" SET NOT NULL,
  ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("id"),
  ADD CONSTRAINT "subscription_category_id_category_id_fk"
    FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

ALTER TABLE "plaid_access_token"
  ALTER COLUMN "id" SET NOT NULL,
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ADD CONSTRAINT "plaid_access_token_pkey" PRIMARY KEY ("id");

-- Remove legacy text columns
ALTER TABLE "category" DROP COLUMN "id_old";
ALTER TABLE "subscription" DROP COLUMN "id_old";
ALTER TABLE "subscription" DROP COLUMN "category_id_old";
ALTER TABLE "plaid_access_token" DROP COLUMN "id_old";

COMMIT;

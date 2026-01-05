-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_reset_password_requested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reset_password_token" TEXT;

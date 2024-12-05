/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ContactUs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ContactUs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_ContactUs" ("contact", "details", "id", "status", "topic") SELECT "contact", "details", "id", "status", "topic" FROM "ContactUs";
DROP TABLE "ContactUs";
ALTER TABLE "new_ContactUs" RENAME TO "ContactUs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

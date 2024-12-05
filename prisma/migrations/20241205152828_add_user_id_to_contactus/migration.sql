/*
  Warnings:

  - Added the required column `userId` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactUs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ContactUs" ("contact", "createdAt", "details", "id", "status", "topic") SELECT "contact", "createdAt", "details", "id", "status", "topic" FROM "ContactUs";
DROP TABLE "ContactUs";
ALTER TABLE "new_ContactUs" RENAME TO "ContactUs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

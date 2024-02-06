/*
  Warnings:

  - You are about to drop the column `price` on the `Stock` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "StockPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "created" DATETIME NOT NULL,
    CONSTRAINT "StockPrice_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    "movingAverage" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Stock" ("id", "lastUpdated", "movingAverage", "symbol") SELECT "id", "lastUpdated", "movingAverage", "symbol" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

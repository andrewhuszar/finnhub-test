-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StockPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockPrice_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StockPrice" ("created", "id", "price", "stockId") SELECT "created", "id", "price", "stockId" FROM "StockPrice";
DROP TABLE "StockPrice";
ALTER TABLE "new_StockPrice" RENAME TO "StockPrice";
CREATE TABLE "new_Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movingAverage" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Stock" ("id", "lastUpdated", "movingAverage", "symbol") SELECT "id", "lastUpdated", "movingAverage", "symbol" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

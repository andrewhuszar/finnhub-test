-- CreateTable
CREATE TABLE "Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    "movingAverage" DECIMAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "CheckoutCart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CheckoutCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CheckoutCartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,
    "genericName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "strengthId" TEXT NOT NULL,
    "strengthLabel" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "supplyDays" INTEGER NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "pharmacyName" TEXT NOT NULL,
    "pharmacyAddress" TEXT NOT NULL,
    "couponPrice" REAL NOT NULL,
    "retailPrice" REAL NOT NULL,
    "couponJson" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CheckoutCartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "CheckoutCart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutCart_userId_key" ON "CheckoutCart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutCart_sessionKey_key" ON "CheckoutCart"("sessionKey");

-- CreateIndex
CREATE INDEX "CheckoutCart_updatedAt_idx" ON "CheckoutCart"("updatedAt");

-- CreateIndex
CREATE INDEX "CheckoutCartItem_cartId_idx" ON "CheckoutCartItem"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "CheckoutCartItem_cartId_pharmacyId_drugId_strengthId_quantity_supplyDays_key" ON "CheckoutCartItem"("cartId", "pharmacyId", "drugId", "strengthId", "quantity", "supplyDays");

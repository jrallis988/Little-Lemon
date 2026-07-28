-- CreateTable
CREATE TABLE "DigitalPass" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "passCode" TEXT NOT NULL,
    "totalCounterPrice" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "note" TEXT,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "DigitalPass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DigitalPassItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "passId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "cartItemId" TEXT,
    "pharmacyName" TEXT,
    "counterPrice" REAL NOT NULL,
    "retailPrice" REAL NOT NULL,
    "switchStatus" TEXT,
    CONSTRAINT "DigitalPassItem_passId_fkey" FOREIGN KEY ("passId") REFERENCES "DigitalPass" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DigitalPassItem_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SwitchEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "pharmacyId" TEXT,
    "drugId" TEXT,
    "status" TEXT NOT NULL,
    "confidence" REAL,
    "liveSwitch" BOOLEAN NOT NULL DEFAULT false,
    "detailJson" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SwitchEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SwitchEvent_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DigitalPass_passCode_key" ON "DigitalPass"("passCode");

-- CreateIndex
CREATE INDEX "DigitalPass_userId_idx" ON "DigitalPass"("userId");

-- CreateIndex
CREATE INDEX "DigitalPass_issuedAt_idx" ON "DigitalPass"("issuedAt");

-- CreateIndex
CREATE INDEX "DigitalPassItem_passId_idx" ON "DigitalPassItem"("passId");

-- CreateIndex
CREATE INDEX "SwitchEvent_createdAt_idx" ON "SwitchEvent"("createdAt");

-- CreateIndex
CREATE INDEX "SwitchEvent_status_idx" ON "SwitchEvent"("status");

-- CreateIndex
CREATE INDEX "SwitchEvent_pharmacyId_idx" ON "SwitchEvent"("pharmacyId");

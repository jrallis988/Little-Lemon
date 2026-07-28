-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "passwordHash" TEXT,
    "allowPersonalizedTips" BOOLEAN NOT NULL DEFAULT false,
    "membershipTier" TEXT NOT NULL DEFAULT 'free',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "membershipStatus" TEXT,
    "membershipExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Drug" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "genericName" TEXT NOT NULL,
    "therapeuticClass" TEXT NOT NULL,
    "rxnormId" TEXT,
    "isControlled" BOOLEAN NOT NULL DEFAULT false,
    "retailCashPrice30" REAL NOT NULL,
    "retailCashPrice90" REAL NOT NULL,
    "searchAliasesJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DrugStrength" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drugId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "amountMg" REAL NOT NULL,
    "form" TEXT NOT NULL,
    "ndc" TEXT,
    CONSTRAINT "DrugStrength_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DrugQuantity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drugId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "DrugQuantity_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "npi" TEXT,
    "ncpdpId" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "hoursWeekday" TEXT NOT NULL,
    "hoursSaturday" TEXT NOT NULL,
    "hoursSunday" TEXT NOT NULL,
    "pharmacyDeskNote" TEXT,
    "acceptsTrumpRxCoupon" BOOLEAN NOT NULL DEFAULT true,
    "driveThru" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PharmacyContract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pharmacyId" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,
    "discountFactor" REAL NOT NULL,
    "floorPrice30" REAL NOT NULL DEFAULT 3.99,
    "floorPrice90" REAL NOT NULL DEFAULT 9.99,
    "inNetwork" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PharmacyContract_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PharmacyContract_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "pharmacyId" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,
    "strengthId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "supplyDays" INTEGER NOT NULL,
    "couponPrice" REAL NOT NULL,
    "retailPrice" REAL NOT NULL,
    "bin" TEXT NOT NULL,
    "pcn" TEXT NOT NULL,
    "groupCode" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "barcodeValue" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'issued',
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "redeemedAt" DATETIME,
    CONSTRAINT "Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Coupon_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Coupon_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SavedMedication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,
    "strengthId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "supplyDays" INTEGER NOT NULL,
    "preferredPharmacyId" TEXT,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SavedMedication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SavedMedication_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PreferredPharmacy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pharmacyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PreferredPharmacy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PreferredPharmacy_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "drugId" TEXT NOT NULL,
    "strengthId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "supplyDays" INTEGER NOT NULL,
    "baselinePrice" REAL NOT NULL,
    "targetPrice" REAL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastCheckedAt" DATETIME,
    "lastNotifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PriceAlert_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ZipLocation" (
    "zip" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "DrugStrength_drugId_idx" ON "DrugStrength"("drugId");

-- CreateIndex
CREATE UNIQUE INDEX "DrugQuantity_drugId_quantity_key" ON "DrugQuantity"("drugId", "quantity");

-- CreateIndex
CREATE INDEX "PharmacyContract_drugId_idx" ON "PharmacyContract"("drugId");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyContract_pharmacyId_drugId_key" ON "PharmacyContract"("pharmacyId", "drugId");

-- CreateIndex
CREATE INDEX "Coupon_memberId_idx" ON "Coupon"("memberId");

-- CreateIndex
CREATE INDEX "Coupon_userId_idx" ON "Coupon"("userId");

-- CreateIndex
CREATE INDEX "Coupon_expiresAt_idx" ON "Coupon"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "SavedMedication_userId_drugId_strengthId_quantity_supplyDays_key" ON "SavedMedication"("userId", "drugId", "strengthId", "quantity", "supplyDays");

-- CreateIndex
CREATE UNIQUE INDEX "PreferredPharmacy_userId_pharmacyId_key" ON "PreferredPharmacy"("userId", "pharmacyId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceAlert_userId_drugId_strengthId_quantity_supplyDays_key" ON "PriceAlert"("userId", "drugId", "strengthId", "quantity", "supplyDays");

-- CreateTable
CREATE TABLE "MedicationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceCode" TEXT NOT NULL,
    "medicationName" TEXT NOT NULL,
    "email" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'received',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "IssueReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referenceCode" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pagePath" TEXT,
    "drugId" TEXT,
    "pharmacyId" TEXT,
    "details" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'received',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicationRequest_referenceCode_key" ON "MedicationRequest"("referenceCode");

-- CreateIndex
CREATE INDEX "MedicationRequest_createdAt_idx" ON "MedicationRequest"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IssueReport_referenceCode_key" ON "IssueReport"("referenceCode");

-- CreateIndex
CREATE INDEX "IssueReport_createdAt_idx" ON "IssueReport"("createdAt");

-- CreateIndex
CREATE INDEX "IssueReport_category_idx" ON "IssueReport"("category");

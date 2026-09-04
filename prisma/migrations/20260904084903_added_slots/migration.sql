-- CreateTable
CREATE TABLE "slot" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "slot_hostId_startAt_idx" ON "slot"("hostId", "startAt");

-- CreateIndex
CREATE INDEX "slot_eventTypeId_startAt_status_idx" ON "slot"("eventTypeId", "startAt", "status");

-- CreateIndex
CREATE UNIQUE INDEX "slot_eventTypeId_startAt_endAt_key" ON "slot"("eventTypeId", "startAt", "endAt");

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "event_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

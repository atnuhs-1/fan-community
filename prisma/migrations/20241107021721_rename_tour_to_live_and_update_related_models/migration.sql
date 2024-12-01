/*
  Warnings:

  - The values [EVENT_INFO] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tour` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PerformanceStatus" AS ENUM ('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LiveType" AS ENUM ('TOUR', 'SINGLE', 'FESTIVAL', 'STREAMING', 'FAN_MEETING', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('GENERAL', 'MERCH_STATUS', 'LIVE_INFO');
ALTER TABLE "Post" ALTER COLUMN "postType" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "postType" TYPE "PostType_new" USING ("postType"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
ALTER TABLE "Post" ALTER COLUMN "postType" SET DEFAULT 'GENERAL';
COMMIT;

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_tourId_fkey";

-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_communityId_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Tour";

-- DropEnum
DROP TYPE "EventStatus";

-- CreateTable
CREATE TABLE "Live" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "liveType" "LiveType" NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Live_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "status" "PerformanceStatus" NOT NULL DEFAULT 'SCHEDULED',
    "liveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Live" ADD CONSTRAINT "Live_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES "Live"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

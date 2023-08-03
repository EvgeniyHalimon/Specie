-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'active');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmationCode" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "source" SET DEFAULT 'via email';

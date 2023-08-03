-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleID" TEXT,
ADD COLUMN     "source" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_categoryID_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_subcategoryID_fkey";

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

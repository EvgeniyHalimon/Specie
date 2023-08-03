-- CreateTable
CREATE TABLE "Subcategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryID" INTEGER NOT NULL,

    CONSTRAINT "Subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategories_name_key" ON "Subcategories"("name");

-- AddForeignKey
ALTER TABLE "Subcategories" ADD CONSTRAINT "Subcategories_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

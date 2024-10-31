/*
  Warnings:

  - You are about to drop the column `minimumQuantity` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "minimumQuantity",
DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InventoryProduct" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "minimumQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryProduct_inventoryId_productId_key" ON "InventoryProduct"("inventoryId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- AddForeignKey
ALTER TABLE "InventoryProduct" ADD CONSTRAINT "InventoryProduct_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryProduct" ADD CONSTRAINT "InventoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

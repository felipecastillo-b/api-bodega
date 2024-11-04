/*
  Warnings:

  - You are about to drop the column `transtaction_cost` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_cost` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transtaction_cost",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "transaction_cost" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

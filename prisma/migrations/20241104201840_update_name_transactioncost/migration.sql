/*
  Warnings:

  - You are about to drop the column `transaction_cost` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transactionCost` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transaction_cost",
ADD COLUMN     "transactionCost" DOUBLE PRECISION NOT NULL;

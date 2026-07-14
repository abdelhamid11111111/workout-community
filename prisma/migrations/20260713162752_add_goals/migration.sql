/*
  Warnings:

  - The `personalGoals` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PersonalGoals" AS ENUM ('WeightLoss', 'MuscleGain', 'Endurance', 'Flexibility', 'GeneralFitness', 'StressRelief');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "personalGoals",
ADD COLUMN     "personalGoals" "PersonalGoals";

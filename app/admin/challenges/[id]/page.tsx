import EditChallengesPage from '@/app/components/admin/challenges/Edit'
import React from 'react'
import { Categories, Level } from "@/generated/prisma/enums"

const Challenges = () => {
  
  const categories = Object.values(Categories)
  const levels = Object.values(Level)

  return <EditChallengesPage categories={categories} levels={levels} />
  
}

export default Challenges
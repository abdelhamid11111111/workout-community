import ChallengesPage from '@/app/components/admin/challenges/Challenges'
import React from 'react'
import { Categories, Level } from "../../../generated/prisma/enums"

const Challenges = () => {
  
  const categories = Object.values(Categories)
  const levels = Object.values(Level)

  return <ChallengesPage categories={categories} levels={levels} />
  
}

export default Challenges
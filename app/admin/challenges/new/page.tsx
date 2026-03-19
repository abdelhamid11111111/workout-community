import NewChallengePage from '@/app/components/admin/challenges/New'
import React from 'react'
import { Categories, Level } from "../../../../generated/prisma/enums"


export default function Page(){
  const categories = Object.values(Categories);
  const levels = Object.values(Level);
  return <NewChallengePage categories={categories} levels={levels}/>
}
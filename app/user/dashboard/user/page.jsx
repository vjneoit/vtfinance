"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
export default function User() {

  const { data: session } = useSession();
  
  return (
    <>
      




    </>
  )
}

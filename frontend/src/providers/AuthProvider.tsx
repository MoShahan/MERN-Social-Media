"use client"

import { useAppSelector } from "@/app/hooks"
import { useRouter } from "next/navigation"
import React from "react"

const AuthProvider = ({ children }: any) => {
  const router = useRouter()

  const isAuth = Boolean(useAppSelector(state => state.accessToken))

  if (!isAuth) {
    router.push("/login")
  }

  return <>{children}</>
}

export default AuthProvider

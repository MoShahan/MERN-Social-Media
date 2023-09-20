"use client"

import React, { useEffect, useState } from "react"
import { useAppSelector } from "../hooks"
import { Box, useMediaQuery } from "@mui/material"
import Navbar from "@/components/Navbar"
import UserWidget from "@/components/UserWidget"
import PostsWidget from "@/components/PostsWidget"
import FriendsListWidget from "@/components/FriendsListWidget"

type ProfilePageProps = { id: string }

const ProfilePage = ({ id }: ProfilePageProps) => {
  const accessToken = useAppSelector(state => state.accessToken)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const loggedInUser = useAppSelector((state: any) => state?.user)

  const [user, setUser] = useState<UserType>(null)

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const res = await response.json()
    setUser(res)
  }

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const res = await response.json()
  }

  useEffect(() => {
    if (id) {
      getUser()
    } else {
      setUser(loggedInUser)
    }
  }, [])

  if (!user) {
    return null
  }

  return (
    <Box>
      <Navbar />
      <Box gap="2rem" justifyContent="center" width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"}>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget url={user?.picturePath} userId={id} />
          <Box m="2rem 0" />
          <FriendsListWidget userId={id} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
          <PostsWidget isProfile={false} userId={id}></PostsWidget>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage

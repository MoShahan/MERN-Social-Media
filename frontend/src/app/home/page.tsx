"use client"

import Navbar from "@/components/Navbar"
import { Box, Divider, useMediaQuery } from "@mui/material"
import React from "react"
import { useAppSelector } from "../hooks"
import UserWidget from "@/components/UserWidget"
import MyPostWidget from "./MyPostWidget"
import PostsWidget from "@/components/PostsWidget"
import AdvertWidget from "@/components/AdvertWidget"
import FriendsListWidget from "@/components/FriendsListWidget"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const user = useAppSelector((state: any) => state?.user)

  return (
    <Box>
      <Navbar />
      <Box gap="0.5rem" justifyContent="space-between" width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"}>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget url={user?.picturePath} userId={user?._id} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
          <MyPostWidget url={user?.picturePath} />
          <Divider sx={{ margin: "1rem" }} />
          <PostsWidget isProfile={false} userId={user?._id}></PostsWidget>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendsListWidget userId={user?._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage

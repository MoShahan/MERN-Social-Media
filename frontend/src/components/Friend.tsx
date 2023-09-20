"use client"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import React from "react"
import FlexBetween from "./FlexBetween"
import { useRouter } from "next/navigation"
import { setFriends } from "@/state"
import UserImage from "./UserImage"
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"

type FriendProps = { id: string; subtitle: string; url: string; name: string }

const Friend = ({ id, name, subtitle, url }: FriendProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const accessToken = useAppSelector((state: any) => state.accessToken)
  const user = useAppSelector((state: any) => state?.user)

  const theme: any = useTheme()
  const pLight = theme.palette.primary.light
  const main = theme.palette.neutral.main
  const medium = theme.palette.neutral.medium

  const isFriend = user?.friends.find((friend: any) => friend.id === id)

  const handleGoToProfile = () => {
    if (id === user?._id) {
      router.push("/profile")
    } else {
      router.push(`/profile/${id}`)
    }
    router.refresh()
  }

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:5000/users/${user?._id}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    const res = await response.json()
    dispatch(setFriends({ friends: res.friends }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={url} size="55px" />
        <Box onClick={handleGoToProfile}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: pLight,
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton sx={{ backgroundColor: pLight, p: "0.6rem" }} onClick={patchFriend}>
        {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend

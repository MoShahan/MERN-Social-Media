"use client"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setFriends } from "@/state"
import { useEffect } from "react"
import WidgetWrapper from "./WidgetWrapper"
import { Box, Typography, useTheme } from "@mui/material"
import Friend from "./Friend"

type FriendsListWidgetProps = { userId: string }

const FriendsListWidget = ({ userId }: FriendsListWidgetProps) => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state: any) => state.accessToken)
  const user = useAppSelector((state: any) => state?.user)
  const theme: any = useTheme()

  const getFriends = async () => {
    const response = await fetch(`http://localhost:5000/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    const res = await response.json()
    dispatch(setFriends({ friends: res }))
  }

  useEffect(() => {
    getFriends()
  }, [])

  if (!user?.friends.length) {
    return null
  }

  return (
    <WidgetWrapper>
      <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }} color={theme.palette.neutral.dark}>
        List of Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user?.friends.map((friend: any) => (
          <Friend key={friend?.id} id={friend.id} name={`${friend?.firstName} ${friend?.lastName}`} subtitle={friend?.occupation} url={friend?.url} />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendsListWidget

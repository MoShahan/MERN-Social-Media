"use client"

import { useAppSelector } from "@/app/hooks"
import { Box, Divider, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import WidgetWrapper from "./WidgetWrapper"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material"

type UserWidgetProps = { userId: string; url: string }

const UserWidget = ({ userId, url }: UserWidgetProps) => {
  const router = useRouter()
  const { palette }: any = useTheme()
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main
  const accessToken = useAppSelector(state => state.accessToken)

  const [user, setUser] = useState<UserType>(null)

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const res = await response.json()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleGoToProfile = () => {
    router.push("/profile")
  }

  if (!user) {
    return null
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={handleGoToProfile}>
        <FlexBetween gap="1rem">
          <UserImage image={url}></UserImage>
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography color={medium}>{user?.friends?.length || 0} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user?.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user?.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Number of profile visits</Typography>
          <Typography color={main} fontWeight="500">
            {user?.viewedProfile || 0}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions</Typography>
          <Typography color={main} fontWeight="500">
            {user?.impressions || 0}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography color={main} mb="1rem" fontSize="1rem" fontWeight="500">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium} fontWeight="500">
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Likedin
              </Typography>
              <Typography color={medium} fontWeight="500">
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget

"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material"
import { DarkMode, Help, LightMode, Message, Menu, Notifications, Search, Close } from "@mui/icons-material"
import { setLogout, toggleMode } from "../state"
import FlexBetween from "./FlexBetween"
import { useAppDispatch, useAppSelector } from "@/app/hooks"

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((state: any) => state?.user)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  const theme: any = useTheme()
  const nLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const bg = theme.palette.background.default
  const pLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  const fullName = `${user?.firstName || "John"} ${user?.lastName || "Doe"}`

  const handleGoToHome = () => {
    router.push("/home")
  }

  return (
    <FlexBetween padding="1rem 6%" bgcolor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color="primary" onClick={() => handleGoToHome()} sx={{ "&:hover": { color: pLight, cursor: "pointer" } }}>
          MERN - Social Media
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween bgcolor={nLight} borderRadius="8px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(toggleMode())}>
            {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px " }} /> : <LightMode sx={{ color: dark, fontSize: "25px " }} />}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" defaultValue={fullName}>
            <Select
              defaultValue={fullName}
              value={fullName}
              sx={{
                bgcolor: nLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3 rem",
                },
                "& .MuiSelect-select:focus": { bgcolor: nLight },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled((prev: any) => !prev)}>
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" bgcolor={nLight}>
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled((prev: any) => !prev)}>
              <Close />
            </IconButton>
          </Box>

          <FlexBetween gap="3rem" flexDirection="column" justifyContent="center" alignItems="center">
            <IconButton onClick={() => dispatch(toggleMode())}>
              {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px " }} /> : <LightMode sx={{ color: dark, fontSize: "25px " }} />}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" defaultValue={fullName}>
              <Select
                defaultValue={fullName}
                value={fullName}
                sx={{
                  bgcolor: bg,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3 rem",
                  },
                  "& .MuiSelect-select:focus": {
                    bgcolor: bg,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar

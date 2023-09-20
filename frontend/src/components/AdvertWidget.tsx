"use client"

import React from "react"
import FlexBetween from "./FlexBetween"
import { Typography, useTheme } from "@mui/material"
import WidgetWrapper from "./WidgetWrapper"

const AdvertWidget = () => {
  const theme: any = useTheme()
  const dark = theme.palette.neutral.dark
  const main = theme.palette.neutral.main
  const medium = theme.palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img width="100%" height="auto" alt="ad" style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }} src="http://localhost:5000/assets/flash.png" />
      <FlexBetween>
        <Typography color={main}>DC Comics</Typography>
        <Typography color={medium}>www.dccomics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The best comicbook universe out there
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget

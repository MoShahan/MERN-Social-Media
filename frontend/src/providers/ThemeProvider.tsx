"use client"

import { themeSettings } from "@/theme"
import { ThemeProvider, createTheme } from "@mui/material"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"

const ThemeProviderComp = ({ children }: any) => {
  const mode = useSelector((state: any) => state?.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderComp

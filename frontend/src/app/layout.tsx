import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CssBaseline } from "@mui/material"
import ReduxProvider from "@/providers/ReduxProvider"
import ThemeProviderComp from "@/providers/ThemeProvider"
import AuthProvider from "@/providers/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Social Media",
  description: "by Mohammed Shahan",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthProvider>
            <ThemeProviderComp>
              <CssBaseline />
              {children}
            </ThemeProviderComp>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bookmarkly",
  description: "あなたのウェブを整理する、シンプルでスマートなブックマーク管理ツール",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
          <main className="container mx-auto py-8 px-4">{children}</main>
        </div>
      </body>
    </html>
  )
}


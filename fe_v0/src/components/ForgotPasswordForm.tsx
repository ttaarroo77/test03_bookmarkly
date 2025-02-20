"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // パスワードリセットのメール送信処理をここに実装
    console.log("パスワードリセットメール送信", { email })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">メールを送信しました</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-zinc-600 dark:text-zinc-400">
            パスワードリセットの手順を記載したメールを送信しました。メールの指示に従ってパスワードをリセットしてください。
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            ログイン画面に戻る
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">パスワードをお忘れの方</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            パスワードリセットメールを送信
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          ログイン画面に戻る
        </Link>
      </CardFooter>
    </Card>
  )
}


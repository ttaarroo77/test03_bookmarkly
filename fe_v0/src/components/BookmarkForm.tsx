"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookmarkForm() {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ブックマーク追加処理をここに実装
    console.log("ブックマーク追加", { url, title, tags: tags.split(",").map((tag) => tag.trim()) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">新規ブックマーク</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              URL
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              タイトル
            </label>
            <Input
              id="title"
              type="text"
              placeholder="ウェブサイトのタイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              タグ（カンマ区切り）
            </label>
            <Input
              id="tags"
              type="text"
              placeholder="タグ1, タグ2, タグ3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            追加
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


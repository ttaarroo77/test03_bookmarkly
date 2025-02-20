"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TagSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // タグ検索処理をここに実装
    console.log("タグ検索", searchTerm)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">タグ検索</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              タグまたはキーワード
            </label>
            <Input
              id="search"
              type="text"
              placeholder="検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            検索
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


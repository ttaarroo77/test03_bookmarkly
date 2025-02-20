"use client"

import { useState } from "react"
import BookmarkCard from "./BookmarkCard"

// 仮のブックマークデータ
const dummyBookmarks = [
  { id: 1, title: "Google", url: "https://www.google.com", tags: ["検索", "ウェブ"] },
  { id: 2, title: "GitHub", url: "https://github.com", tags: ["開発", "コード"] },
  { id: 3, title: "Vercel", url: "https://vercel.com", tags: ["ホスティング", "開発"] },
]

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState(dummyBookmarks)

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}


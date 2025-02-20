import BookmarkList from "@/components/BookmarkList"
import BookmarkForm from "@/components/BookmarkForm"
import TagSearch from "@/components/TagSearch"

export default function BookmarksPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">ブックマーク管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <BookmarkList />
        </div>
        <div className="space-y-8">
          <BookmarkForm />
          <TagSearch />
        </div>
      </div>
    </div>
  )
}


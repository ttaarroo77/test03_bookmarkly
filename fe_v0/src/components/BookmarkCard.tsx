import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Edit, Trash } from "lucide-react"

interface BookmarkCardProps {
  bookmark: {
    id: number
    title: string
    url: string
    tags: string[]
  }
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline flex items-center"
        >
          {bookmark.url}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
        <div className="mt-2 flex flex-wrap gap-2">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-1" />
          編集
        </Button>
        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
          <Trash className="w-4 h-4 mr-1" />
          削除
        </Button>
      </CardFooter>
    </Card>
  )
}


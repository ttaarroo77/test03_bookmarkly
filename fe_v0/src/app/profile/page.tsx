import ProfileForm from "@/components/ProfileForm"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">マイプロフィール</h1>
      <div className="max-w-md mx-auto">
        <ProfileForm />
      </div>
    </div>
  )
}


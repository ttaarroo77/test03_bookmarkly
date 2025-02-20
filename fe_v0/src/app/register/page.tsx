import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-zinc-800 dark:text-zinc-100">Bookmarkly</h1>
        <RegisterForm />
      </div>
    </div>
  )
}


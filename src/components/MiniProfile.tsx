import { useSession, signOut } from "next-auth/react"

const MiniProfile = () => {
  const { data: session } = useSession()
  return (
    <div className="flex items-center justify-between">
      <img
        className="h-16 rounded-full border p-[2px]"
        src={session?.user?.image || ""}
        alt="Avatar"
      />
      <div className="flex-1 ml-3">
        <h2 className="font-bold">{session?.user?.name || ""}</h2>
        <h3 className="text-sm text-gray-400">
          Добро пожаловать в учебный проект
        </h3>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm"
        onClick={() => signOut()}
      >
        Выйти
      </button>
    </div>
  )
}

export default MiniProfile

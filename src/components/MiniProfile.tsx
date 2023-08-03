import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/providers/useAuth"
import { signOut } from "firebase/auth"

const MiniProfile = () => {
  const { auth, currentUser, setCurrentUser } = useAuth()
  const router = useRouter()

  const onSignOut = () => {
    signOut(auth)
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
      <Link
        href={`/user/${currentUser?.name?.replace(/\s+/g, "_").toLowerCase()}`}
      >
        <img
          className="w-16 h-16 rounded-full border p-[2px]"
          src={currentUser?.image || ""}
          alt={currentUser?.name || "Лого"}
        />
      </Link>
      <div className="flex-1">
        <Link
          href={`/user/${currentUser?.name
            ?.replace(/\s+/g, "_")
            .toLowerCase()}`}
        >
          <h2 className="font-bold">{currentUser?.name || ""}</h2>
        </Link>
        <h3 className="text-sm text-gray-400">
          Добро пожаловать в учебный проект
        </h3>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm text-left"
        onClick={() => onSignOut()}
      >
        Выйти
      </button>
    </div>
  )
}

export default MiniProfile

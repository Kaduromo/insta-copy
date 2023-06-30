import { useSession } from "next-auth/react"
import Story from "./Story"

const initialUsers = [
  { _id: 1, username: "Анатолий", img: "https://i.pravatar.cc/150?img=1" },
  { _id: 2, username: "Ирина", img: "https://i.pravatar.cc/150?img=2" },
  { _id: 3, username: "Евгений", img: "https://i.pravatar.cc/150?img=3" },
  { _id: 4, username: "Наталья", img: "https://i.pravatar.cc/150?img=4" },
  { _id: 5, username: "Сергей", img: "https://i.pravatar.cc/150?img=5" },
  { _id: 6, username: "Ольга", img: "https://i.pravatar.cc/150?img=6" },
  { _id: 7, username: "Дмитрий", img: "https://i.pravatar.cc/150?img=7" },
  { _id: 8, username: "Татьяна", img: "https://i.pravatar.cc/150?img=8" },
  { _id: 9, username: "Максим", img: "https://i.pravatar.cc/150?img=9" },
  { _id: 10, username: "Екатерина", img: "https://i.pravatar.cc/150?img=10" },
  { _id: 11, username: "Анна", img: "https://i.pravatar.cc/150?img=11" },
  { _id: 12, username: "Николай", img: "https://i.pravatar.cc/150?img=12" },
  { _id: 13, username: "Мария", img: "https://i.pravatar.cc/150?img=13" },
  { _id: 14, username: "Алексей", img: "https://i.pravatar.cc/150?img=14" },
  { _id: 15, username: "Елена", img: "https://i.pravatar.cc/150?img=15" },
  { _id: 16, username: "Игорь", img: "https://i.pravatar.cc/150?img=16" },
  { _id: 17, username: "Любовь", img: "https://i.pravatar.cc/150?img=17" },
  { _id: 18, username: "Павел", img: "https://i.pravatar.cc/150?img=18" },
  { _id: 19, username: "Виктория", img: "https://i.pravatar.cc/150?img=19" },
  { _id: 20, username: "Артем", img: "https://i.pravatar.cc/150?img=12" },
]

const Stories = () => {
  const users = initialUsers
  const { data: session } = useSession()
  return (
    <ul className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 overflow-x-scroll rounded-sm scrollbar-none">
      {session && (
        <Story
          name={session.user?.name || ""}
          img={session.user?.image || ""}
          isUser={true}
        />
      )}
      {users &&
        users.map((user) => (
          <Story key={user._id} name={user.username} img={user.img} />
        ))}
    </ul>
  )
}

export default Stories

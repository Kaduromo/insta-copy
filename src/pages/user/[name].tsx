import "@/app/globals.css"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/app/firebase"
import { Users, UserPage } from "@/components/User"
import { useAuth } from "@/providers/useAuth"

const UserName = ({ userName }: { userName: string }) => {
  // console.log( uid)

  const userNameLowerCase = userName.replace(/\s+/g, "_").toLowerCase()
  const [posts, setPosts] = useState([])
  const { currentUser, users } = useAuth()

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => setPosts(snapshot.docs)
    )
  }, [])

  if (currentUser) {
    const usersAll = users.map((u: any) => {
      return {
        id: u.id,
        email: u.data().email,
        image: u.data().image,
        name: u.data().name,
        timestamp: u.data().timestamp,
        uid: u.data().uid,
        username: u.data().username,
      }
    })

    return (
      <>
        {userNameLowerCase ===
        currentUser?.name.replace(/\s+/g, "_").toLowerCase() ? (
          <>
            <UserPage currentUser={currentUser} posts={posts} />
          </>
        ) : (
          <Users
            user={usersAll.find(
              (u: any) =>
                userNameLowerCase ===
                  u.name.replace(/\s+/g, "_").toLowerCase() && u
            )}
            posts={posts}
          />
        )}
      </>
    )
  }

  return <div>Loading...</div>
}

export default UserName

export async function getServerSideProps({ params }: any) {
  return { props: { userName: params.name } }
}

import "@/app/globals.css"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/app/firebase"
import { Users, UserPage } from "@/components/User"
import { useAuth } from "@/providers/useAuth"
import { IUsers, IPostUser } from "@/types/types"

const UserName = ({ userName }: { userName: string }) => {
  // console.log(userName)

  const userNameLowerCase = userName.replace(/\s+/g, "_").toLowerCase()
  const [posts, setPosts] = useState([])
  const { currentUser, users } = useAuth()

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => setPosts(snapshot.docs)
    )
  }, [])

  const usersAll = users.map((u: IUsers) => {
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

  const allPost = posts.map((p: IPostUser) => {
    return {
      id: p.id,
      image: p.data().image,
      username: p.data().username,
    }
  })

  const filterPost = allPost.filter(
    (p: { id: string; image: string; username: string }) =>
      userName === p.username.replace(/\s+/g, "_").toLowerCase() && p
  )

  return (
    <>
      {userNameLowerCase ===
      currentUser?.name.replace(/\s+/g, "_").toLowerCase() ? (
        <>
          <UserPage currentUser={currentUser} posts={filterPost} />
        </>
      ) : (
        <Users
          user={usersAll.find(
            (u: any) =>
              userNameLowerCase === u.name.replace(/\s+/g, "_").toLowerCase() &&
              u
          )}
          posts={filterPost}
        />
      )}
    </>
  )

  return <div>Loading...</div>
}

export default UserName

export async function getServerSideProps({ params }: any) {
  return { props: { userName: params.name } }
}

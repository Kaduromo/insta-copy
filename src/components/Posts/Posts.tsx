import { useEffect, useState } from "react"
import Post from "./Post"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/app/firebase"
import { IPostUser } from "@/types/types"

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => setPosts(snapshot.docs)
    )
  }, [])

  return (
    <ul>
      {posts &&
        posts.map((post: IPostUser) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.data().username}
            userImg={post.data().profileImg}
            image={post.data().image}
            caption={post.data().caption}
          />
        ))}
    </ul>
  )
}

export default Posts

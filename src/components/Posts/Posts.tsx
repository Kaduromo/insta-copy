import { useEffect, useState } from "react"
import Post from "./Post"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/app/firebase"

interface IPost {
  id: string
  data: () => {
    caption: string
    image: string
    profileImg: string
    username: string
    timestamp: {
      seconds: number
      nanoseconds: number
    }
  }
}

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => setPosts(snapshot.docs)
    )
  }, [db])

  return (
    <div>
      {posts &&
        posts.map((post: IPost) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.data().username}
            userImg={post.data().profileImg}
            image={post.data().image}
            caption={post.data().caption}
          />
        ))}
    </div>
  )
}

export default Posts

import { db } from "@/app/firebase"
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import "moment/locale/ru"

interface IPost {
  id: string
  name: string
  userImg: string
  image: string
  caption: string
}

interface ICommentPost {
  id: string
  data: () => {
    comment: string
    userImage: string
    username: string
    timestamp: {
      seconds: number
      nanoseconds: number
      toDate: () => string
    }
  }
}

interface ISession {
  expires: string
  user: {
    email: string
    image: string
    name: string
    uid: string
    username: string
  }
}

const Post = ({ id, name, userImg, image, caption }: IPost) => {
  const [comment, setComment] = useState("")
  const [commentsPost, setCommentsPost] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const { data: session }: any = useSession()

  // types session
  const sessionId = session?.user?.uid

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot: any) => setCommentsPost(snapshot.docs)
    )
  }, [db, id])

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setComment("")

    await addDoc(collection(db, "posts", id, "comments"), {
      comment,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  // commentsPost.map((c: ICommentPost) => {
  //   const date = new Date(c.data()?.timestamp?.seconds * 1000)
  //   console.log(date)
  // })

  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot: any) =>
      setLikes(snapshot.docs)
    )
  }, [])

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: { id: string }) => like.id === sessionId) !== -1
    )
  }, [likes])

  const likePost = async () => {
    hasLiked
      ? await deleteDoc(doc(db, "posts", id, "likes", sessionId))
      : await setDoc(doc(db, "posts", id, "likes", sessionId), {
          username: session?.user?.name,
        })
  }

  return (
    <div className="bg-white border rounded-md my-7">
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={userImg}
          alt={name}
        />
        <p className="font-bold flex-1">{name}</p>
        <EllipsisHorizontalIcon className="h-7" />
      </div>
      <div>
        <img className="object-cover w-full" src={image} alt={caption} />
      </div>
      {session && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-400"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      <div className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">Нравится {likes.length}</p>
        )}
        <span className="font-bold mr-2">{name}</span>
        {caption}
      </div>
      {commentsPost.length > 0 && (
        <>
          <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
            {commentsPost.map((c: ICommentPost) => (
              <div key={c.id} className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src={c.data().userImage}
                  alt={`Image ${c.data().username}`}
                />
                <p className="font-semibold">{c.data().username}</p>
                <p className="flex-1 truncate">{c.data().comment}</p>
                <Moment fromNow>{c.data().timestamp?.toDate()}</Moment>
              </div>
            ))}
          </div>
        </>
      )}
      {session && (
        <form className="flex gap-2 items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Оставить комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200"
            onClick={sendComment}
          >
            Отправить
          </button>
        </form>
      )}
    </div>
  )
}

export default Post

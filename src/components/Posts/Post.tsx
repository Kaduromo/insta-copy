import Link from "next/link"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import "moment/locale/ru"
import { useAuth } from "@/providers/useAuth"
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
import { db } from "@/app/firebase"
import { ICommentPost, IPost } from "@/types/types"

const Post = ({ id, name, userImg, image, caption }: IPost) => {
  const [comment, setComment] = useState("")
  const [commentsPost, setCommentsPost] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  const { currentUser, setCurrentUser, users } = useAuth()

  const userId = currentUser?.uid

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot: any) => setCommentsPost(snapshot.docs)
    )
  }, [id])

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setComment("")

    await addDoc(collection(db, "posts", id, "comments"), {
      comment,
      username: currentUser?.name,
      userImage: currentUser?.image,
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
  }, [id])

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: { id: string }) => like.id === userId) !== -1
    )
  }, [likes,userId])

  const likePost = async () => {
    hasLiked
      ? await deleteDoc(doc(db, "posts", id, "likes", userId))
      : await setDoc(doc(db, "posts", id, "likes", userId), {
          username: currentUser?.name,
        })
  }

  return (
    <li className="bg-white border rounded-md mx-4 my-6 xl:mx-0 md:my-7 shadow-md shadow-slate-500/50">
      <div className="flex items-center justify-between p-1">
        <Link
          href={`/user/${name.replace(/\s+/g, "_").toLowerCase()}`}
          className="font-bold inline-flex items-center p-1"
        >
          <img
            className="w-10 h-10 rounded-full border p-1 mr-3"
            src={userImg}
            alt={name}
          />
          {name}
        </Link>
        <EllipsisHorizontalIcon className="h-7" />
      </div>
      <img className="block" src={image} alt={caption} />
      {currentUser && (
        <div className="flex items-center justify-between px-3 pt-2">
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
      <div className="p-3 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">Нравится {likes.length}</p>
        )}
        <span className="font-bold mr-2">{name}</span>
        {caption}
      </div>
      {commentsPost.length > 0 && (
        <>
          {/* <div className="mx-5 max-h-28 overflow-y-scroll scrollbar-none"> */}
          <div className="mx-5 max-h-28 overflow-y-scroll scroll-bar">
            {commentsPost.map((c: ICommentPost) => (
              <div
                key={c.id}
                className="flex flex-col md:flex-row md:items-center space-x-2 mb-2"
              >
                <Link
                  href={`/user/${c
                    .data()
                    .username.replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  className="shrink-0"
                >
                  <img
                    className="w-7 h-7 rounded-full"
                    src={c.data().userImage}
                    alt={`Image ${c.data().username}`}
                  />
                </Link>
                <Link
                  href={`/user/${c
                    .data()
                    .username.replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  className="font-semibold"
                >
                  {c.data().username}
                </Link>
                <p className="flex-1 truncate">{c.data().comment}</p>
                <Moment fromNow>{c.data().timestamp?.toDate()}</Moment>
              </div>
            ))}
          </div>
        </>
      )}
      {currentUser && (
        <form
          className="flex gap-2 items-center p-4"
          onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) =>
            e.preventDefault()
          }
        >
          <FaceSmileIcon className="h-7" />
          <input
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Оставить комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.trim() && (
            <button
              type="submit"
              className="text-blue-400 font-bold disabled:text-blue-200"
              onClick={sendComment}
            >
              Отправить
            </button>
          )}
        </form>
      )}
    </li>
  )
}

export default Post

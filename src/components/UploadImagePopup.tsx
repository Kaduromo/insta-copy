"use client"

import { useRef, useState } from "react"
import { useAuth } from "@/providers/useAuth"
import { db, storage } from "@/app/firebase"
import { CameraIcon } from "@heroicons/react/24/outline"
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

const UploadImagePopup = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState("")
  const filePickerRef = useRef<HTMLInputElement>(null)

  const { currentUser } = useAuth()

  const onButtonClick = () => {
    if (filePickerRef && filePickerRef.current) {
      filePickerRef.current.click()
    }
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      caption,
      username: currentUser?.name,
      profileImg: currentUser?.image,
      timestamp: serverTimestamp(),
    })

    const imgRef = ref(storage, `posts/${docRef.id}/image`)

    selectedFile &&
      (await uploadString(imgRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imgRef)
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          })
        }
      ))

    setLoading(false)
    setSelectedFile(null)
    setCaption("")
  }

  return (
    <div className="max-w-lg p-6 bg-white border-2 rounded-md shadow-md z-50">
      <div className="flex flex-col justify-center items-center h-full">
        {selectedFile ? (
          <img
            onClick={() => setSelectedFile(null)}
            src={selectedFile}
            alt={caption || "image"}
            className="w-full max-h-[250px] cursor-pointer"
          />
        ) : (
          <CameraIcon
            onClick={onButtonClick}
            className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
          />
        )}
        <input
          type="file"
          hidden
          ref={filePickerRef}
          onChange={addImageToPost}
        />
        <input
          type="text"
          placeholder="Please enter your caption..."
          className="m-4 border-none text-center w-full focus:ring-0"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          disabled={!selectedFile || loading}
          onClick={uploadPost}
          className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
        >
          Upload Post
        </button>
      </div>
    </div>
  )
}

export default UploadImagePopup

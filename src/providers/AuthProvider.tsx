"use client"

import { FC, createContext, useEffect, useMemo, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { IPostUser } from "@/types/types"
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore"
import { db } from "@/app/firebase"

export const AuthContext = createContext<any>({})

const AuthProvider: FC<any> = ({ children }: any) => {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState<IPostUser | any>(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(db, "users")), (snapshot: any) =>
      setUsers(snapshot.docs)
    )
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(
            db,
            "users",
            auth.currentUser?.providerData[0].uid || ""
          )
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            setCurrentUser(docSnap.data())
          }
        }

        fetchUser()
      }
    })
  }, [auth])

  const values = useMemo(
    () => ({ auth, users, currentUser, setCurrentUser }),
    [auth, users, currentUser, setCurrentUser]
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider

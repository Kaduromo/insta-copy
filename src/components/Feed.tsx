"use client"

import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile"
import { Posts } from "./Posts"
import { Stories } from "./Stories"
import Suggestions from "./Suggestions"

const Feed = () => {
  const { data: session } = useSession()

  return (
    <main
      className={`grid grid-cols-1 mx-auto ${
        session ? "md:grid-cols-3 md:max-w-6xl" : "md:grid-cols-2 md:max-w-3xl"
      }`}
    >
      <section className="md:col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px] mt-14 ml-10">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Feed

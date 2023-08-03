"use client"

import MiniProfile from "./MiniProfile"
import { Posts } from "./Posts"
import { Stories } from "./Stories"
import Suggestions from "./Suggestions"
import { useAuth } from "@/providers/useAuth"

const Feed = () => {
  const { currentUser } = useAuth()

  return (
    <main
      className={`grid grid-cols-1 mx-auto ${
        currentUser
          ? "md:grid-cols-3 md:max-w-6xl"
          : "md:grid-cols-2 md:max-w-3xl"
      }`}
    >
      <section className="md:col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden md:block md:col-span-1">
        <div className="fixed xl:w-[380px] mt-10 ml-4 xl:ml-10">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Feed

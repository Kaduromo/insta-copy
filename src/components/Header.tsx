"use client"

import Image from "next/image"
import Link from "next/link"
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"
import { HomeIcon } from "@heroicons/react/24/solid"
import { Popup } from "reactjs-popup"
import UploadImagePopup from "./UploadImagePopup"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/useAuth"

const Header = () => {
  const router = useRouter()
  const { currentUser, setCurrentUser, users } = useAuth()

  return (
    <header className="border-b sticky top-0 bg-white z-30 shadow-md shadow-slate-600/50">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-2 lg:p-0 lg:px-2">
        <Link
          href="/"
          className="cursor-pointer w-24 h-24 relative hidden lg:inline-grid"
        >
          <Image
            fill={true}
            priority={true}
            src="/image/instagram-logo.svg"
            alt="Instagram Logo"
          />
        </Link>
        <Link
          href="/"
          className="cursor-pointer w-14 h-10 shrink-0 relative lg:hidden"
        >
          <Image
            className="object-contain"
            fill={true}
            src="/image/instagram-logo-mobile.svg"
            alt="Instagram Logo"
          />
        </Link>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute top-2 left-2 h-5 text-gray-500" />
          <input
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Поиск"
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <Link
            href="/"
            className="hidden md:inline-flex w-6 h-6 cursor-pointer hover-125"
          >
            <HomeIcon />
          </Link>
          {currentUser ? (
            <>
              <Popup
                position={"center center"}
                modal
                // lockScroll
                trigger={() => (
                  <PlusCircleIcon className="w-6 h-6 shrink-0 cursor-pointer hover-125" />
                )}
              >
                <UploadImagePopup />
              </Popup>
              <Link
                href={`/user/${currentUser?.name
                  ?.replace(/\s+/g, "_")
                  .toLowerCase()}`}
                className="shrink-0"
              >
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={currentUser?.image || ""}
                  alt={currentUser?.name || ""}
                />
              </Link>
            </>
          ) : (
            <button onClick={() => router.push("/auth/signin")}>Войти</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

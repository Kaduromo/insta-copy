"use client"

import Image from "next/image"
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline"
import { HomeIcon } from "@heroicons/react/24/solid"
import { useSession, signIn, signOut } from "next-auth/react"
import { Popup } from "reactjs-popup"
import UploadImagePopup from "./UploadImagePopup"
import Link from "next/link"

const Header = () => {
  const { data: session } = useSession()
  // console.log(session)

  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="cursor-pointer w-24 h-24 relative hidden lg:inline-grid"
        >
          <Image
            className="object-contain"
            fill={true}
            priority={true}
            src="/image/instagram-logo.svg"
            alt="Instagram Logo"
          />
        </Link>
        <Link href="/" className="cursor-pointer w-14 h-10 relative lg:hidden">
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
            className="hidden md:inline-flex h-6 cursor-pointer hover-125"
          >
            <HomeIcon />
          </Link>
          {session ? (
            <>
              <Popup
                position={"center center"}
                modal
                // lockScroll
                trigger={() => (
                  <PlusCircleIcon className="h-6 cursor-pointer hover-125" />
                )}
              >
                <UploadImagePopup />
              </Popup>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
                onClick={() => signOut()}
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Войти</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

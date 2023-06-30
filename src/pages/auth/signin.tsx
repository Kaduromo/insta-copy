import AuthProvider from "@/app/AuthProvider"
import "@/app/globals.css"

import Header from "@/components/Header"
import { getProviders, signIn } from "next-auth/react"

interface IProviders {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

const signin = ({ providers }: { providers: IProviders }) => {
  return (
    <>
    <AuthProvider>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://assets.website-files.com/612d05fbe157d13308a9a349/616809e188f0af2d37d0898d_insta2.png"
          alt="Insta - Image"
        />
        <div className="">
          {Object.values(providers).map((p: IProviders) => (
            <div key={p.name} className="flex flex-col items-center">
              <img
                className="w-32 object-cover"
                src="https://mobile-review.com/all/wp-content/uploads/2021/07/instagram-logo.png"
                alt="Insta - Image"
              />
              <p className="text-sm italic my-10 text-center">
                Это приложение создано в учебных целях
              </p>
              <b
                className="cursor-pointer bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 hover-110"
                onClick={() => signIn(p.id, {callbackUrl: '/'})}
              >
                Войти с помощью {p.name}
              </b>
            </div>
          ))}
        </div>
      </div>
      </AuthProvider>
    </>
  )
}

export default signin

export async function getServerSideProps(context: any) {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

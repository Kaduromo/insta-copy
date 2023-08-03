import "@/app/globals.css"
import { useRouter } from "next/navigation"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/app/firebase"

const SignIn = () => {
  const router = useRouter()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      await signInWithPopup(auth, provider)

      const user = auth.currentUser?.providerData[0]
      const docRef = doc(db, "users", user?.uid || "")
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          uid: user?.uid,
          timestamp: serverTimestamp(),
          username: user?.displayName
            ? user?.displayName.split(" ").join("").toLocaleLowerCase()
            : "Без имени",
        })
      }

      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center space-x-7 mt-20">
      <img
        className="hidden rotate-6 md:inline-flex md:w-48"
        src="https://assets.website-files.com/612d05fbe157d13308a9a349/616809e188f0af2d37d0898d_insta2.png"
        alt="Insta - Image"
      />
      <div className="">
        <div className="flex flex-col items-center">
          <img
            className="w-32"
            src="https://mobile-review.com/all/wp-content/uploads/2021/07/instagram-logo.png"
            alt="Insta - Image"
          />
          <p className="text-sm italic my-10 text-center">
            Это приложение создано в учебных целях
          </p>
          <b
            className="cursor-pointer bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 hover-110"
            onClick={onGoogleClick}
          >
            Войти с помощью Google
          </b>
        </div>
      </div>
    </div>
  )
}

export default SignIn

import Head from "next/head"
import { IFirebaseUser } from "@/types/types"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/useAuth"
import { signOut } from "firebase/auth"

const UserPage = ({
  currentUser,
  posts,
}: {
  currentUser: IFirebaseUser
  posts: {
    id: string
    image: string
    username: string
  }[]
}) => {
  const { auth, setCurrentUser } = useAuth()
  const router = useRouter()
  console.log("UserPage")

  
  const onSignOut = () => {
    signOut(auth)
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>{currentUser?.name} | Insagram App</title>
      </Head>
      <div className="row sm:p-4 flex-grow-1">
        <div className="sm:p-5">
          <div className="bg-white shadow-xl rounded">
            <div className="p-3">
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <div className="flex flex-col items-center grow">
                  <img
                    className="rounded-full border mb-2 basis-24 w-24 md:basis-36 md:w-36"
                    src={currentUser.image || ""}
                    alt={currentUser.name || "Лого"}
                  />
                  <h4 className="font-bold text-xl md:text-2xl">
                    {currentUser.name || "Без имени"}
                  </h4>
                  {/* {user.profession && (
                      <p className="small">{user.profession}</p>
                    )} */}
                </div>
                <div className="flex flex-col grow gap-3">
                  {/* {handleUserId(
                      <button
                        className="text-white bg-gray-500 rounded p-2 hover:bg-gray-600 ease-in duration-150"
                        onClick={() => navigate(`/user/${userId}/:edit`)}
                      >
                        Редактировать профиль
                      </button>,
                      <button className="text-white bg-blue-500 rounded p-2 hover:bg-blue-600 ease-in duration-150">
                        Подписаться
                      </button>
                    )} */}
                  <button
                    className="text-white bg-gray-500 rounded p-2 hover:bg-gray-600 ease-in duration-150"
                    // onClick={() => navigate(`/user/${userId}/:edit`)}
                  >
                    Редактировать профиль
                  </button>
                  <button
                    className="text-white bg-red-500 rounded p-2 hover:bg-red-600 ease-in duration-150"
                    onClick={() => onSignOut()}
                  >
                    Выйти
                  </button>
                  <ul className="flex justify-center items-center gap-3">
                    <li className="text-center">
                      <h5 className="font-bold">
                        {currentUser?.image?.length || "0"}
                      </h5>
                      <span className="text-gray-400">Публикаций</span>
                    </li>
                    <li className="text-center">
                      {/* <h5 className="font-bold">{user.followers || 0}</h5> */}
                      <h5 className="font-bold">0</h5>
                      <span className="text-gray-400">Подписчиков</span>
                    </li>
                    <li className="text-center">
                      {/* <h5 className="font-bold">{user.following || 0}</h5> */}
                      <h5 className="font-bold">0</h5>
                      <span className="text-gray-400">Подписок</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-lg">Публикации</h5>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {posts
                  ? posts.map(
                      (post: {
                        id: string
                        image: string
                        username: string
                      }) => (
                        <div
                          key={post.id}
                          className="sm:basis-1/3 px-4 mr-[-0.75rem] h-[120px] md:h-[240px] lg:h-[310px]"
                        >
                          <img
                            src={post.image}
                            alt={post.username}
                            className="rounded border p-1 mr-3 shadow-md shadow-slate-700/50"
                          />
                        </div>
                      )
                    )
                  : "Здесь пока пусто"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage

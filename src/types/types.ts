export interface ICommentPost {
  id: string
  data: () => {
    comment: string
    userImage: string
    username: string
    timestamp: {
      seconds: number
      nanoseconds: number
      toDate: () => string
    }
  }
}

export interface ISession {
  expires: string
  user: {
    email: string
    image: string
    name: string
    uid: string
    username: string
  }
}

export interface IPost {
  id: string
  name: string
  userImg: string
  image: string
  caption: string
}

export interface IPostUser {
  id: string
  data: () => {
    caption: string
    image: string
    profileImg: string
    timestamp: { seconds: number; nanoseconds: number }
    username: string
  }
}

export interface IFirebaseUser {
  uid: string | null
  name: string | null
  image: string | null
  email: string | null
  username: string | null
  timestamp: { seconds: number | null; nanoseconds: number | null }
}

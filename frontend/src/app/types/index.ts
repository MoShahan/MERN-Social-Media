type UserType = {
  picturePath: string
  firstName: string
  lastName: string
  friends: Array<any>
  impressions: number
  viewedProfile: number
  occupation: string
  location: string
  _id: string
} | null

type PostType = {
  url: string
  userId: string
  description: string
  comments: Array<any>
  likes: Array<any>
  user: UserType
  _id: string
}

import React from "react"
import ProfilePage from "../ProfilePage"

const OtherProfilePage = ({ params }: { params: { userId: string } }) => {
  return <ProfilePage id={params.userId} />
}

export default OtherProfilePage

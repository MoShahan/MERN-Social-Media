import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "dark",
  user: null,
  posts: [],
  accessToken: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: state => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    setLogout: state => {
      state.user = null
      state.accessToken = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.warn("User does not exist, cannot set Friends")
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map(post => {
        if (post.id === action.payload.postId) {
          return action.payload.post
        } else {
          return post
        }
      })
      state.posts = updatedPosts
    },
  },
})

export const { toggleMode, setFriends, setLogin, setPost, setPosts, setLogout } = authSlice.actions

export default authSlice.reducer

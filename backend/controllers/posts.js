import Post from "../models/Post.js"
import User from "../models/User.js"

export const createPost = async (req, res, next) => {
  try {
    console.log("req.payload:", req.body)
    const { description, userId, url } = req.body
    const newPost = new Post({ description, userId, url, likes: {}, comments: [] })
    await newPost.save()
    const posts = await Post.find() // get all posts
    res.status(201).json(posts)
  } catch (e) {
    res.status(409).json({ msg: e.message })
  }
}

export const getFeed = async (req, res, next) => {
  try {
    const posts = await Post.find()
    // const updatedPosts = await posts.map(async post => {
    //   const user = await User.findById(post.userId)
    //   return { ...post, user }
    // })
    // res.status(200).json(updatedPosts)
    res.status(200).json(posts)
  } catch (e) {
    res.status(404).json({ msg: e.message })
  }
}

export const getPost = async (req, res, next) => {
  try {
    const { postId } = req.params
    const post = await Post.findById(postId)
    res.status(200).json(post)
  } catch (e) {
    res.status(404).json({ msg: e.message })
  }
}

export const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params
    const posts = await Post.find({ userId })
    res.status(200).json(posts)
  } catch (e) {
    res.status(404).json({ msg: e.message })
  }
}

export const likePost = async (req, res, next) => {
  try {
    let message = ""
    const { postId } = req.params
    const { userId } = req.body
    const post = await Post.findById(postId)

    // // SELF METHOD
    // if (post.likes[userId]) {
    //   // UNLIKE
    //   post.likes[userId] = false
    //   message = "your like has been removed"
    // } else {
    //   // LIKE
    //   post.likes[userId] = true
    //   message = "you liked this post"
    // }
    // await post.save()

    const isLiked = post.likes.get(userId)
    if (isLiked) {
      post.likes.delete(userId)
      message = "your like has been removed"
    } else {
      post.likes.set(userId, true)
      message = "you liked this post"
    }
    const updatedPost = await Post.findByIdAndUpdate(postId, { likes: post.likes }, { new: true })

    res.status(200).json({ message, updatedPost })
  } catch (e) {
    res.status(404).json({ msg: e.message })
  }
}

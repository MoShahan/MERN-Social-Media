import express from "express"
import { verifyAccessToken } from "../middleware/auth.js"
import { getFeed, getPost, getUserPosts, likePost } from "../controllers/posts.js"

const router = express.Router()

router.get("/", verifyAccessToken, getFeed)

router.get("/:postId", verifyAccessToken, getPost)

router.patch("/:postId/like", verifyAccessToken, likePost)

router.get("/:userId/posts", verifyAccessToken, getUserPosts)

export default router

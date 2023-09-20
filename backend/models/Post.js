import mongoose from "mongoose"

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, default: "" },
    url: { default: "", type: String },
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema)

export default Post

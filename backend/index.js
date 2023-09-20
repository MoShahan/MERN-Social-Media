import mongoose from "mongoose"
import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import multer from "multer"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifyAccessToken } from "./middleware/auth.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"

const __filename = fileURLToPath(import.meta.url) // this file path
// console.log(__filename)
const __dirname = path.dirname(__filename) // this folder path
// console.log(__dirname)

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// FILE STORAGE
// arrow
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

// did not put this under route, because we need upload function
app.post("/auth/register", upload.single("picture"), register)
app.post("/post", verifyAccessToken, upload.single("picture"), createPost)

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

const PORT = process.env.PORT
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo connected")
    app.listen(PORT, () => console.log(`listening from ${PORT}`))
  })
  .catch(e => {
    console.log("mongo could not be connected")
    console.log(e.message)
  })

process.on("SIGINT", async () => {
  await mongoose.connection.close()
  process.exit(0)
})

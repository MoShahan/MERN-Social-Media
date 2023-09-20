import jwt from "jsonwebtoken"

export const verifyAccessToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization")
    if (!token) return res.status(403).json({ error: "Access Denied" })
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1]
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = verified
    next()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

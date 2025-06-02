import express from "express"
import { names, store } from "../controller/UserController.js"
const userRouter = express.Router()

userRouter.post("/user",store)
userRouter.get("/user",names)

export default userRouter
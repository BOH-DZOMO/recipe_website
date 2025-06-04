import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
import userRouter from "./route/UserRoute.js"
import RecipeRouter from "./route/RecipeRoute.js"
import authenticate from "./middleware/auth.js"


const app = express()
const port = 3001

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(userRouter)
app.use(RecipeRouter)

app.get('/api/profile', authenticate, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
  });

app.listen(port, ()=>{
    console.log('Example app listening on port')
})


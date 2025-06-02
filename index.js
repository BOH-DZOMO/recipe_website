import express, { json } from "express"
import userRouter from "./route/UserRoute.js"
import RecipeRouter from "./route/RecipeRoute.js"

const app = express()
const port = 3001

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(userRouter)
app.use(RecipeRouter)
// app.get("/", function(req,res){
//     res.send("hello bro")
// })

app.listen(port, ()=>{
    console.log('Example app listening on port')
})
import express from "express"
import { addFavourite, create, destroy, removeFavourite, searchBYCuisine, searchBYIngredients, show, update } from "../controller/RecipeController.js"
import authenticate from "../middleware/auth.js"
const RecipeRouter = express.Router()

RecipeRouter.post("/recipes/create",create)
// RecipeRouter.get("/recipe",index)
RecipeRouter.put("/recipes/:recipe_id",update)
RecipeRouter.post("/recipes/search/ingredients",searchBYIngredients)
RecipeRouter.post("/recipes/search/cuisine",searchBYCuisine)
RecipeRouter.get("/recipes/:recipe_id",show)
RecipeRouter.post("/recipes/favourite/add", addFavourite)
RecipeRouter.post("/recipes/favourite/delete", removeFavourite)
RecipeRouter.delete("/recipes/:recipe_id",destroy)


export default RecipeRouter
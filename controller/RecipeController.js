import db from "../db.js"

export const create = async (req,res)=>{
    const {author,name,ingredients,instructions,cuisine_type,rating} = req.body;

    const query = "INSERT INTO `recipes`(`name`, `ingredients`, `instructions`, `author`, `cuisine_type`, `rating`) VALUES (?,?,?,?,?,?)"
    const values = [name,ingredients,instructions,author,cuisine_type,rating]
    console.log(values)
    
    try {

        await db.execute(query,values)
        console.log("insertion succesfull")
        res.json({message: "Insertion succesfull", status: 202})
    } catch (error) {
        res.status(405).json({message: "Insertion unsuccesfull", error: error})      
    }
}

export const update = async (req,res)=>{
    //need to add authentication to verify that only author can edit in fe 1e middleware
    const recipe_id = req.params.recipe_id;
    const {name,ingredients,instructions,cuisine_type,rating} = req.body;

    const query = "UPDATE `recipes` SET `name`=?, `ingredients`=?, `instructions`=?,`cuisine_type`=?, `rating`=?, `updated_at` = NOW() WHERE `recipe_id`=?"
    const values = [name,ingredients,instructions,cuisine_type,rating,recipe_id]
    console.log(values)
    
    try {
        const [result] = await db.execute(query,values)
        console.log("update succesfull")
        res.json({message: "Update succesfull", status: 202})
    } catch (error) {
        res.status(405).json({message: "Update unsuccesfull", error: error})      
    }


}

export const show = async (req,res)=>{
    //show per recipe
    const recipe_id = req.params.recipe_id;
    const query = "SELECT * FROM `recipes` WHERE recipe_id = ?"
    const values = [recipe_id]
    try {
        const [[result]] = await db.execute(query,values)
        console.log(result)
        res.status(202).json({data: result})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}

export const destroy = async (req,res)=>{
    //show per recipe
    const recipe_id = req.params.recipe_id;
    const query = "DELETE FROM `recipes` WHERE recipe_id = ?"
    const values = [recipe_id]
    console.log(values)
    
    try {
        await db.execute(query,values)
        res.json({message: "delete succesfull", status: 202})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}
//search by ingredients
export const searchBYIngredients = async (req,res)=>{
    const query = "SELECT * FROM `recipes` WHERE ingredients LIKE ?"

    const target = '%'+req.body.ingredients+'%'
    const values = [target]
    console.log(values)
    
    try {
        const [result] = await db.execute(query,values)
        console.log("search complete")
        res.json({message: "search complete", status: 202, data: result})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}

//search by cuisine

export const searchBYCuisine = async (req,res)=>{
    const query = "SELECT * FROM `recipes` WHERE cuisine_type LIKE ?"

    const target = '%'+req.body.cuisine+'%'
    const values = [target]
    console.log(values)
    
    try {
        const [result] = await db.execute(query,values)
        console.log("search complete")
        res.json({message: "search complete", status: 202, data: result})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}

export const addFavourite = async (req,res)=>{
    const {user_id, recipe_id} = req.body;
    const query = "INSERT INTO `favourites`(`user`, `recipe`) VALUES (?,?)"
    const values = [user_id,recipe_id]
    console.log(values)
    
    try {
        await db.execute(query,values)
        console.log("show succesfull")
        res.status(202).json({message: "item added succesfully"})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}

export const removeFavourite = async (req,res)=>{
    const {user_id, recipe_id} = req.body;
    const query = "DELETE FROM `favourites` WHERE `user`=? AND `recipe`=?"
    const values = [user_id,recipe_id]
    console.log(values)
    
    try {
        await db.execute(query,values)
        console.log("show succesfull")
        res.status(202).json({message: "item removed succesfully"})
    } catch (error) {
        res.status(405).json({message: "operation  unsuccesfull", error: error})      
    }
}
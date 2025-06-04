import mysql from 'mysql2/promise'
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

try {
    await db.connect();
    console.log("Connected to mysql");
    console.log(await bcrypt.hash("helloworld", 10))
} catch (error) {
    console.log("error");
    
}
 
export default db
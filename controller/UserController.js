import db from "../db.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



export const register = async (req, res) => {
  const {username,email,password}= req.body;
  if (!(username && email && password)){
    return res.status(403).json({status: "Operation failed",message: "Fill all rows(username,email,password)"})
  }
  const [email_rows] = await db.execute("SELECT email FROM users  WHERE email = ?", [email]);
  let errors = []
  if (email_rows.length !== 0) {
    // return res.status(401).json({error: "email already used"})
    errors.push("email already used")
  }
  const [username_rows] = await db.execute("SELECT username FROM users  WHERE username = ?", [username]);
  if (username_rows.length !== 0) {
    // return res.status(401).json({error: "username already used"})
    errors.push("username already used")
  }
  if (errors) {
    return res.status(401).json({error: errors})
  }
  const hash = await bcrypt.hash(password, 10)
  try {
    await db.execute("INSERT INTO users (username,email, password) VALUES (?, ?, ?)", [username,email,hash]);
    res.json({message: "User registered"})
  } catch (error) {
    res.status(403).json({error: error})
  }
};

export const login = async (req, res) => {
  const {email,password}= req.body;
  console.log(req.body)
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  console.log(rows)
  if (rows.length === 0) {
    return res.status(401).json({error: "email not found"})
  }
  const match = await bcrypt.compare(password, rows[0].password)
  if (!match) return res.status(401).json({error: "invalid password"})  
  const token = jwt.sign({userid: rows.user_id}, process.env.JWT_SECRET, {expiresIn: '1h'})
  res.json({message: "Loggen In", token});
}



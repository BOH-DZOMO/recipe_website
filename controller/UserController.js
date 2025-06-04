import db from "../db.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



export const register = async (req, res) => {
  const {username,email,password}= req.body;
  const hash = await bcrypt.hash(password, 10)
  try {
    const [row] = await db.execute("INSERT INTO users (username,email, password) VALUES (?, ?, ?)", [username,email,hash]);
    res.json({message: "User registered"})
  } catch (error) {
    res.status(403).json({error: error})
  }
};

export const login = async (req, res) => {
  const {email,password}= req.body;
  console.log(req.body)
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) {
    return res.status(401).json({error: "email not found"})
  }
  const match = await bcrypt.compare(password, rows[0].password)
  if (!match) return res.status(401).json({error: "invalid password"})  
  const token = jwt.sign({userid: rows[0].user_id}, process.env.JWT_SECRET, {expiresIn: '1h'})
  res.json({message: "Loggen In", token});
}

export const names = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT username FROM users");
    console.log(rows);
    const usernames = rows.map(row => row.username)
    console.log(usernames);
    res.json({usernames})
  } catch (error) {
    console.error("error");
  }
};

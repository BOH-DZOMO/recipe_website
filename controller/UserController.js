import db from "../db.js";

export const store = (req, res) => {
  //let storage = []
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  res.send(data);
};

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

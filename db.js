import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'recipe'
});

try {
    await db.connect();
    console.log("Connected to mysql");
    
} catch (error) {
    console.log("error");
    
}
 
export default db
const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// Create connection 
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

// Connect
connection.connect((err) => {
if(err){
  throw err;
}
console.log('MySQL connected!');
});

class DatabaseService {
  static getDatabaseServiceInstance() {
    return instance ? instance : new DatabaseService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
          const query = "SELECT * FROM names;";
          connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
          })
      });
      // console.log(response);
      return response;
    } catch (err) {
        console.log(err);
    }
  }

  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name, date) VALUES (?,?);";
        connection.query(query, [name, dateAdded], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
        })
    });
    return {
      id : insertId,
      name : name,
      dateAdded : dateAdded
    };
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = DatabaseService;
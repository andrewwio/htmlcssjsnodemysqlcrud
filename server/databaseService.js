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
}


module.exports = DatabaseService;
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

  async deleteRowById(id) {
    try {
      id = id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = ?;";
        connection.query(query, [id], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
        })
    });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateNameById(id) {
    try {
      id = id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE names SET name = ? WHERE id = ?;";
        connection.query(query, [name, id], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
        })
    });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async searchByName(name) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM names WHERE name = ?;";

            connection.query(query, [name], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}
}


module.exports = DatabaseService;
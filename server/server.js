const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

const databaseService = require('./databaseService');

// Create database
app.get('/createdatabase', (req, res) => {
  let sql = 'CREATE DATABASE htmlcssjsnodemysqlcrud';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Database created!');
  });
});

// Create table 
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, name VARCHAR(255), date DATETIME, PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Posts table created!');
  });
});


// Create
app.post('/insert', (req, res) => {

});

// Read
app.get('/getAll', (req, res) => {
  res.json({ 
    success: true
  });
});

// Update

// Delete

app.listen(process.env.PORT, () => {
  console.log('Server started on port 5000');
});
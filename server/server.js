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

// Create
app.post('/insert', (request, response) => {
 const { name } = request.body;
 const db = databaseService.getDatabaseServiceInstance();
 const result = db.insertNewName(name);
 result
 .then(data => response.json({ data: data }))
 .catch(err => console.log(err));
});

// Read
app.get('/getAll', (request, response) => {
  const db = databaseService.getDatabaseServiceInstance();
  const result = db.getAllData();
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
});

// Update

// Delete

app.listen(process.env.PORT, () => {
  console.log('Server started on port 5000');
});
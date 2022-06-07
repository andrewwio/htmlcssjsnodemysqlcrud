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
app.patch('/update', (request, response) => {
 const { id, name } = request.body;
 const db = databaseService.getDatabaseServiceInstance();
 const result = db.updateNameById(id, name);
 result
 .then(data => response.json({ success : data }))
 .catch(err => console.log(err));
});

// Delete
app.delete('/delete/:id', (request, response) => {
  const { id } = request.params;
  const db = databaseService.getDatabaseServiceInstance();
  const result = db.deleteRowById(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});

// Search
app.get('/search/:name', (request, response) => {
  const { name } = request.params;
  const db = databaseService.getDatabaseServiceInstance();
  const result = db.searchByName(name);
  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));
})


app.listen(process.env.PORT, () => {
  console.log('Server started on port 5000');
});
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());


// Create a MySQL connection
const db = mysql.createConnection({
  host     : 'project-db.c7y4me0oi4nv.us-east-1.rds.amazonaws.com',
  user     : 'seif',
  password : '*******',
  database : 'webappdb',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM transactions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

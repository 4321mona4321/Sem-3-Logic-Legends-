const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'tourism_db', // create this database in MySQL
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Create the 'reviews' table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    review TEXT NOT NULL
  )
`, err => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table "reviews" created or already exists');
  }
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, images)
app.use(express.static('public'));

// Endpoint to handle submitting reviews
app.post('/submitReview', (req, res) => {
  const { name, review } = req.body;

  if (!name || !review) {
    return res.status(400).json({ error: 'Name and review are required' });
  }

  // Insert the review into the 'reviews' table
  db.query('INSERT INTO reviews (name, review) VALUES (?, ?)', [name, review], (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Review inserted with ID:', result.insertId);
      res.status(200).json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

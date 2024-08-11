const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files

// Login routes
app.post('/police-login', (req, res) => {
    // Handle police login
    res.send('Police login successful');
});

app.post('/fire-login', (req, res) => {
    // Handle fire brigade login
    res.send('Fire brigade login successful');
});

// Register routes
app.post('/police-register', (req, res) => {
    // Handle police registration
    res.send('Police registration successful');
});

app.post('/fire-register', (req, res) => {
    // Handle fire brigade registration
    res.send('Fire brigade registration successful');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:80);
});

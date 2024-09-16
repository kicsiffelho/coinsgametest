const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cosr');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Leaderboard array
let Leaderboard = [];

// POST request to add a score to the leaderboard
app.post('/add-score', (req, res) => {
    const {playerName, score} = req.body;
    Leaderboard.push({playerName, score});
    Leaderboard.sort((a, b) => b.score - a.score); // Sort by highest score
    res.status(200).json({message: 'Score added!', Leaderboard});
});

// GET request to get the leaderboard
app.get('/leaderboard', (req, res) => {
    res.status(200).json(Leaderboard);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
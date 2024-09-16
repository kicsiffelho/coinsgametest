const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://kicsiffelho:7VP7vnwoZjjMcRQS@coinclicker-cluster.ekzvo.mongodb.net/?retryWrites=true&w=majority&appName=coinclicker-cluster';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define a schema and model for Leaderboard
const leaderboardSchema = new mongoose.Schema({
    playerName: String,
    score: Number
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// POST request to add a score to the leaderboard
app.post('/add-score', (req, res) => {
    const { playerName, score } = req.body;
    const newScore = new Leaderboard({ playerName, score });

    newScore.save()
        .then(() => {
            return Leaderboard.find().sort({ score: -1 });
        })
        .then((leaderboard) => {
            res.status(200).json({ message: 'Score added!', leaderboard });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error adding score', error: err });
        });
});

// GET request to get the leaderboard
app.get('/leaderboard', (req, res) => {
    Leaderboard.find().sort({ score: -1 })
        .then((leaderboard) => {
            res.status(200).json(leaderboard);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error fetching leaderboard', error: err });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

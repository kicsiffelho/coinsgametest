const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://kicsiffelho:7VP7vnwoZjjMcRQS@coinclicker-cluster.ekzvo.mongodb.net/?retryWrites=true&w=majority&appName=coinclicker-cluster';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema and model for Leaderboard
const leaderboardSchema = new mongoose.Schema({
  playerName: String,
  score: Number
});
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

app.use(bodyParser.json());
app.use(cors());

// POST request to add a score to the leaderboard
app.post('/add-score', async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const newScore = new Leaderboard({ playerName, score });
    await newScore.save();
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.status(200).json({ message: 'Score added!', leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Error adding score', error });
  }
});

// GET request to get the leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leaderboard', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

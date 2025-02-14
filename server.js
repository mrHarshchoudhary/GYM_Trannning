const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/fitnessDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Define Schema and Model
const mentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    goal: String
});

const Mentor = mongoose.model('Mentor', mentorSchema);

// Routes
app.post('/api/mentor', async (req, res) => {
    try {
        const { name, email, goal } = req.body;
        const newMentor = new Mentor({ name, email, goal });
        await newMentor.save();
        res.status(201).json({ message: 'Mentor registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering mentor' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
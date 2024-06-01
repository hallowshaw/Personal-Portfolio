require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors({
    origin: '*'
}));

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define the schema and model
const viewSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const View = mongoose.model('View', viewSchema);

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the visit count
app.get('/api/get-views', async (req, res) => {
    try {
        let view = await View.findOne();
        if (!view) {
            view = new View();
        }
        view.count++;
        await view.save();
        // Send response
        res.json({ views: view.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch or update views' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

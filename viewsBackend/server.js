require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

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

const corsOptions = {
    origin: 'https://personal-portfolio-virid-rho.vercel.app',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
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
        res.json({ views: view.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch or update views' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

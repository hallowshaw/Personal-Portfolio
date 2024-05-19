const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const countFile = path.join(__dirname, 'count.txt');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the visit count
app.get('/api/get-views', (req, res) => {
    fs.readFile(countFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read count file' });
        }
        let count = parseInt(data, 10) || 0;
        count++;
        fs.writeFile(countFile, count.toString(), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write count file' });
            }
            res.json({ views: count });
        });
    });
});


app.listen(port);

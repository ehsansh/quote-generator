// backend/server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// API endpoint to get a random quote
app.get('/api/quote', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) {
            // console.error(
            //     `Error fetching from dummyjson: ${response.status} - ${response.statusText}`
            // );
            return res
                .status(response.status)
                .json({ error: `Failed to fetch quote from external API: ${response.statusText}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        // console.error('Error in /api/quote:', error);
        res.status(500).json({ error: 'Internal Server Error while fetching quote.' });
    }
});

// Simple root endpoint
app.get('/', (req, res) => {
    res.send('Node.js Backend is running and serving quotes!');
});

// --- IMPORTANT CHANGE: Only start listening if the file is run directly ---
if (require.main === module) {
    app.listen(port, '0.0.0.0', () => {
        // console.log(`Backend server listening on port ${port}`);
    });
}

// --- IMPORTANT CHANGE: Export the app for testing ---
module.exports = app;

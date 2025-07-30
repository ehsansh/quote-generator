// backend/server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // We'll need a node-fetch equivalent for server-side fetching

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// API endpoint to get a random quote
app.get('/api/quote', async (req, res) => {
    try {
        // Fetch a random quote from dummyjson.com, just like your frontend used to do
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            // If the external API call failed, pass that error back
            console.error(`Error fetching from dummyjson: ${response.status} - ${response.statusText}`);
            return res.status(response.status).json({ error: `Failed to fetch quote from external API: ${response.statusText}` });
        }

        const data = await response.json();
        // Send the data directly to the frontend
        res.json(data);
    } catch (error) {
        console.error('Error in /api/quote:', error);
        res.status(500).json({ error: 'Internal Server Error while fetching quote.' });
    }
});

// Simple root endpoint
app.get('/', (req, res) => {
    res.send('Node.js Backend is running and serving quotes!');
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
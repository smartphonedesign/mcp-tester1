const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const quotesPath = path.join(__dirname, 'quotes.txt');
let quotes = [];

// Load quotes on startup
function loadQuotes() {
  try {
    const data = fs.readFileSync(quotesPath, 'utf-8');
    quotes = data.split('\n').filter(line => line.trim().length > 0);
    console.log(`Loaded ${quotes.length} quotes.`);
  } catch (err) {
    console.error('Error loading quotes:', err.message);
  }
}
loadQuotes();

app.post('/invoke', (req, res) => {
  if (quotes.length === 0) {
    return res.status(500).json({ output: 'No quotes available at the moment.' });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ output: randomQuote });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP Tool Server listening on port ${port}`);
});

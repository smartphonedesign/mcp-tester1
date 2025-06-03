import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Polyfill for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const quotesPath = path.join(__dirname, 'quotes.json');
let quotes = [];

function loadQuotes() {
  try {
    const data = fs.readFileSync(quotesPath, 'utf-8');
    quotes = JSON.parse(data);
    console.log(`✅ Loaded ${quotes.length} quotes.`);
  } catch (err) {
    console.error('❌ Failed to load quotes:', err.message);
  }
}
loadQuotes();

app.post('/invoke', (req, res) => {
  const name = req.body.toolInput?.name || 'there';
  const topic = req.body.toolInput?.topic?.toLowerCase();

  let filteredQuotes = quotes;

  if (topic) {
    filteredQuotes = quotes.filter(q => q.topic.toLowerCase() === topic);
    if (filteredQuotes.length === 0) {
      return res.json({
        output: `Hi ${name}. Sorry, I don't have any quotes for the topic "${topic}".`
      });
    }
  }

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  res.json({
    output: `Hi ${name}. Here is your quote: "${randomQuote.text}"`
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 MCP Tool Server is live on port ${port}`);
});

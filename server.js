import express from 'express';

const app = express();
app.use(express.json());

app.post('/invoke', (req, res) => {
  const input = req.body.toolInput;

  const name = input?.name || "user";
  const question = input?.question || "No question provided";

  const reply = `Hi ${name}, you asked: "${question}". I’m just a test MCP tool.`;

  res.json({ output: reply });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP Tool Server listening on port ${port}`);
});

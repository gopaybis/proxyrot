const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({ token: 'sampletoken123' });
  }
  res.status(401).json({ message: 'Unauthorized' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

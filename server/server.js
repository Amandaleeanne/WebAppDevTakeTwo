const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5174',
  optionsSuccessStatus: 200
};
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: ['Hello from the server!'] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
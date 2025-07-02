const express = require('express');
const path = require('path');
const cors = require('cors');
const monstersRoute = require('./routes/monsters');

const app = express();
app.use(cors());

app.use('/api/monsters', monstersRoute);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

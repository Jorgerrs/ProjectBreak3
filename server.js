const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/monsters';

async function start() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db();
  const monsters = db.collection('monsters');

  app.get('/api/monsters', async (req, res) => {
    const list = await monsters.find().sort({ id: 1 }).toArray();
    res.json(list);
  });

  app.use(express.static(path.join(__dirname, 'public')));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});

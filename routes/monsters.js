const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const database = await db.connect();
  const monsters = database.collection('monsters');
  const list = await monsters.find().sort({ id: 1 }).toArray();
  res.json(list);
});

module.exports = router;

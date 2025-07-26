require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
require('dotenv').config();
const Trade = require('./models/Trade'); // ✅ required
const transformRoutes = require('./routes/transformRoutes');

const app = express();
app.use(cors({
  origin: 'https://stock-analyzer-frontend-chi.vercel.app/',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api/upload', uploadRoutes);
app.use('/api/transform', transformRoutes);
app.get('/api/trades', async (req, res) => {
  try {
    const trades = await Trade.find().sort({ date: -1 });
    res.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error.message);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

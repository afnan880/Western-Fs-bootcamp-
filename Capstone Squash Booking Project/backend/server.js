
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./Connection');

const courtsRouter = require('./routes/courts');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/courts', courtsRouter);
app.use('/bookings', bookingsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Squash Booking API is running' });
});

// Quick test for db.
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courts');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

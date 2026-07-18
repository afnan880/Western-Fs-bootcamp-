
const express = require('express');
const router = express.Router();
const pool = require('../Connection');

// GET /courts - list all courts
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courts');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courts' });
  }
});

// GET /courts/:id/availability with date
// Returns which 1-hour slots (5am-11pm) are already booked for that court/date
router.get('/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'date query param is required' });
  }

  try {
    const [booked] = await pool.query(
      `SELECT start_time FROM bookings WHERE court_id = ? AND booking_date = ?`,
      [id, date]
    );

    // Build full list of hourly slots 5am - 11pm
    const allSlots = [];
    for (let hour = 5; hour < 23; hour++) {
      allSlots.push(`${String(hour).padStart(2, '0')}:00:00`);
    }

    const bookedTimes = booked.map(b => b.start_time);
    const availability = allSlots.map(slot => ({
      start_time: slot,
      available: !bookedTimes.includes(slot)
    }));

    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

module.exports = router;
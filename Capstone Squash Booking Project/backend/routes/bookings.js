
const express = require('express');
const router = express.Router();
const pool = require('../Connection');

const VALID_HOURS = Array.from({ length: 18 }, (_, i) => 5 + i); // 5am - 10pm start times

function isValidStartTime(startTime) {
  const hour = parseInt(startTime.split(':')[0], 10);
  return VALID_HOURS.includes(hour);
}

function getEndTime(startTime) {
  const [h, m, s] = startTime.split(':').map(Number);
  const endHour = h + 1;
  return `${String(endHour).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

//  get bookings - list all bookings 
router.get('/', async (req, res) => {
  const { date, court_id } = req.query;
  let query = 'SELECT * FROM bookings';
  const params = [];

  if (date) {
    query += ' WHERE booking_date = ?';
    params.push(date);
  }
  if (court_id) {
    query += (date ? ' AND' : ' WHERE') + ' court_id = ?';
    params.push(court_id);
  }

  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// bookings - create a new booking
router.post('/', async (req, res) => {
  const {
    court_id,
    member_id,
    booking_date,
    start_time,
    num_players,
    is_member,
    guardian_required,
    guest_name,
    guest_contact
  } = req.body;

  // Basic validation
  if (!court_id || !booking_date || !start_time || !num_players || typeof is_member !== 'boolean') {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }
  if (![1, 2].includes(Number(num_players))) {
    return res.status(400).json({ error: 'num_players must be 1 or 2' });
  }
  if (!isValidStartTime(start_time)) {
    return res.status(400).json({ error: 'start_time must be an hourly slot between 5am and 10pm' });
  }

  const end_time = getEndTime(start_time);
  // The booking screen currently collects a member name, not an authenticated
  // numeric member ID. Avoid inserting that name into the integer member_id
  // column; retain it as the booking contact until member authentication exists.
  const numericMemberId = Number(member_id);
  const resolvedMemberId = Number.isInteger(numericMemberId) && numericMemberId > 0
    ? numericMemberId
    : null;
  const memberFlag = is_member ? 'Y' : 'N';
  const resolvedGuestName = guest_name || (
    is_member && typeof member_id === 'string' ? member_id.trim() || null : null
  );

  try {
    // Check slot isn't already booked 
    const [existing] = await pool.query(
      `SELECT booking_id FROM bookings WHERE court_id = ? AND booking_date = ? AND start_time = ?`,
      [court_id, booking_date, start_time]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'This slot is  booked' });
    }

    const [result] = await pool.query(
      `INSERT INTO bookings
        (court_id, member_id, booking_date, start_time, end_time, num_players, is_member, guardian_required, guest_name, guest_contact)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [court_id, resolvedMemberId, booking_date, start_time, end_time, num_players, memberFlag, guardian_required || 'N', resolvedGuestName, guest_contact || null]
    );

    res.status(201).json({ booking_id: result.insertId, message: 'Booking created' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'This slot is already booked' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

//  reschedule a booking (change date/time/court)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { court_id, booking_date, start_time } = req.body;

  if (!court_id || !booking_date || !start_time) {
    return res.status(400).json({ error: 'court_id, booking_date, and start_time are required' });
  }
  if (!isValidStartTime(start_time)) {
    return res.status(400).json({ error: 'start_time must be an hourly slot between 5am and 10pm' });
  }

  const end_time = getEndTime(start_time);

  try {
    const [conflict] = await pool.query(
      `SELECT booking_id FROM bookings
       WHERE court_id = ? AND booking_date = ? AND start_time = ? AND booking_id != ?`,
      [court_id, booking_date, start_time, id]
    );
    if (conflict.length > 0) {
      return res.status(409).json({ error: 'This slot is already booked' });
    }

    const [result] = await pool.query(
      `UPDATE bookings SET court_id = ?, booking_date = ?, start_time = ?, end_time = ? WHERE booking_id = ?`,
      [court_id, booking_date, start_time, end_time, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking rescheduled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reschedule booking' });
  }
});

//  - cancel a booking
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if(!id || isNaN(id)) {
    return res.status(400).json({ error: 'Booking ID is required and it should be a number' });
  }

  try {
    const [result] = await pool.query('DELETE FROM bookings WHERE booking_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;

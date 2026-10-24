const pool = require('../config/db');

exports.registerForEvent = async (req, res) => {
  const client = await pool.connect();
  try {
    const { full_name, email, event_id } = req.body;

    if (!full_name || !email || !event_id) {
      return res.status(400).json({ error: 'Bütün məlumatları daxil edin.' });
    }

    await client.query('BEGIN');

    // 1. İstifadəçi var yoxsa yarat
    let userResult = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    let userId;
    if (userResult.rows.length === 0) {
      const newUser = await client.query(
        'INSERT INTO users (full_name, email) VALUES ($1, $2) RETURNING id',
        [full_name, email]
      );
      userId = newUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
    }

    // 2. Tədbir limiti və mövcudluğunu yoxla
    const eventResult = await client.query(
      `SELECT max_capacity, 
              (SELECT COUNT(*) FROM registrations WHERE event_id = $1) as count 
       FROM events WHERE id = $1`,
      [event_id]
    );

    if (eventResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Tədbir tapılmadı.' });
    }

    const { max_capacity, count } = eventResult.rows[0];
    if (parseInt(count) >= parseInt(max_capacity)) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Tədbir üçün iştirakçı limiti dolmuşdur.' });
    }

    // 3. Təkrar qeydiyyat yoxlaması
    const regCheck = await client.query(
      'SELECT id FROM registrations WHERE user_id = $1 AND event_id = $2',
      [userId, event_id]
    );
    if (regCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Siz artıq bu tədbirə qeydiyyatdan keçmisiniz.' });
    }

    // 4. Qeydiyyata al
    await client.query(
      'INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)',
      [userId, event_id]
    );

    await client.query('COMMIT');
    res.status(201).json({ message: 'Qeydiyyat uğurla tamamlandı!' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Qeydiyyat zamanı xəta baş verdi.' });
  } finally {
    client.release();
  }
};
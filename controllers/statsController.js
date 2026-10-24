const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await pool.query('SELECT COUNT(*) FROM events');
    const totalRegistrations = await pool.query('SELECT COUNT(*) FROM registrations');
    
    // Ən çox qeydiyyat olan top 3 tədbir
    const topEvents = await pool.query(`
      SELECT e.title, COUNT(r.id) as reg_count 
      FROM events e 
      LEFT JOIN registrations r ON e.id = r.event_id 
      GROUP BY e.id 
      ORDER BY reg_count DESC LIMIT 3
    `);

    // Kateqoriya üzrə təhlil
    const categoryStats = await pool.query(`
      SELECT c.name, COUNT(e.id) as event_count 
      FROM categories c 
      LEFT JOIN events e ON c.id = e.category_id 
      GROUP BY c.id
    `);

    res.json({
      totalEvents: totalEvents.rows[0].count,
      totalRegistrations: totalRegistrations.rows[0].count,
      topEvents: topEvents.rows,
      categoryStats: categoryStats.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Statistika yüklənərkən xəta baş verdi.' });
  }
};
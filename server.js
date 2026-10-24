require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Path modulu əlavə olundu

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Rotaları
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/register', require('./routes/registrationRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
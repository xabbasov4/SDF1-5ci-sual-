const express = require('express');
const router = express.Router();

// Nümunə endpoint
router.get('/', (req, res) => {
    res.json({ message: "Events route works!" });
});

module.exports = router; // Bu sətir mütləq olmalıdır!
const express = require('express');
const { transformTrades } = require('../controllers/transformController');
const router = express.Router();

router.get('/transform', transformTrades);

module.exports = router;
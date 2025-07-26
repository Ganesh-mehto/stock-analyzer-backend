const express = require('express');
const multer = require('multer');
const { handleCsvUpload } = require('../controllers/uploadController');
// const Trade = require('../models/Trade'); // ✅ required

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/',upload.single('file'), handleCsvUpload);

// Optional GET route (uncomment if needed)
// router.get('/trades', async (req, res) => {
//   try {
//     const trades = await Trade.find().sort({ date: 1 });
//     res.json(trades);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch trades' });
//   }
// });

module.exports = router;

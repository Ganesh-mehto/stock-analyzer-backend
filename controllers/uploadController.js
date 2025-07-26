const fs = require('fs');
const csv = require('csv-parser');
const Trade = require('../models/Trade');
const handleCsvUpload = (req, res) => {
 if (!req.file) {
  return res.status(400).json({ error: 'No file uploaded' });
}

const trades = [];

fs.createReadStream(req.file.path)
  .pipe(csv())
  .on('data', (row) => {
    try {
      if (row['Date/Time'] && row.Symbol && row.Quantity && row['T. Price'] && row.Proceeds) {
        const quantity = parseFloat(row.Quantity.replace(/,/g, ''));
        const proceeds = parseFloat(row.Proceeds);
        const trade = {
          date: new Date(row['Date/Time'].split(',')[0]),
          symbol: row.Symbol,
          action: proceeds < 0 ? 'Buy' : 'Sell',
          quantity,
          price: parseFloat(row['T. Price']),
          transactionValue: Math.abs(proceeds),
          currency: row.Currency,
        };

        // Optional: skip if invalid numbers
        if (!isNaN(trade.quantity) && !isNaN(trade.price)) {
          trades.push(trade);
        }
      }
    } catch (err) {
      console.error('Error parsing row:', err.message);
    }
  })
  .on('error', (err) => {
    console.error('Stream read error:', err);
    res.status(500).json({ error: 'Failed to process file' });
  })
  .on('end', async () => {
  try {
    console.log('Parsed trades:', trades);
    await Trade.insertMany(trades);
    fs.unlinkSync(req.file.path);
    res.json({ message: 'Trades uploaded and saved.' });
  } catch (error) {
    console.error('Error saving trades to DB:', error);
    res.status(500).json({ error: 'Failed to save trades' });
  }
});

}

module.exports = { handleCsvUpload };

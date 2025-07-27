const Trade = require('../models/Trade');
const fetchExchangeRates = require('../utils/fetchExchangeRates');
const fetchSplitEvents = require('../utils/fetchSplitEvents');

const transformTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    const splitEvents = await fetchSplitEvents();
    const exchangeRates = await fetchExchangeRates();

    const adjusted = trades.map(trade => {
      let quantity = trade.quantity;
      let price = trade.price;
      let adjusted = false;

      const splits = splitEvents
        .filter(split => split.symbol === trade.symbol && new Date(trade.date) < new Date(split.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      splits.forEach(split => {
        quantity *= split.ratio;
        price /= split.ratio;
        adjusted = true;
      });

      const rate = exchangeRates[trade.date.toISOString().split('T')[0]] || { USD: 1, INR: 82, SGD: 1.35 };

      return {
        ...trade._doc,
        adjustedQuantity: adjusted ? quantity : trade.quantity,
        adjustedPrice: adjusted ? price : trade.price,
        usdValue: price * quantity * (rate['USD'] || 1),
        inrValue: price * quantity * (rate['INR'] || 82),
        sgdValue: price * quantity * (rate['SGD'] || 1.35)
      };
    });

    res.json(Array.isArray(adjusted) ? adjusted : []);
  } catch (error) {
    console.error('Transformation failed:', error);
    res.status(500).json({ error: 'Transformation failed' });
  }
};

module.exports = { transformTrades };
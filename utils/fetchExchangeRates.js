module.exports = async function fetchSplitEvents() {
  return [
    { symbol: 'AAPL', date: '2022-01-10', ratio: 2 },
    { symbol: 'TSLA', date: '2022-06-01', ratio: 3 }
  ];
};
module.exports = async function fetchExchangeRates() {
  return {
    '2022-01-01': { USD: 1, INR: 75, SGD: 1.35 },
    '2022-06-01': { USD: 1, INR: 78, SGD: 1.37 },
    // fallback defaults can be used for unknown days
  };
};
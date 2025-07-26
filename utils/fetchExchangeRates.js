
module.exports = async function fetchExchangeRates() {
  return {
    '2022-01-01': { USD: 1, INR: 75, SGD: 1.35 },
    '2022-06-01': { USD: 1, INR: 78, SGD: 1.37 },
    // fallback defaults can be used for unknown days
  };
};
const fetchTransactions = async (alertId) => {
  const response = await fetch(
    `http://130.61.51.1/api/transactions?alertId=${alertId}`
  );

  const data = await response.json();

  return data;
};

export default fetchTransactions;

const postTransactions = async (prop) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prop),
  };

  const response = await fetch(
    `http://130.61.51.1/api/transactions`,
    requestOptions
  );

  const data = await response.json();

  return data;
};

export default postTransactions;

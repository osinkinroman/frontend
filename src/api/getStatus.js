const getStatus = async () => {
  const response = await fetch(`http://130.61.51.1/api/status`);

  const data = await response.json();

  return data;
};

export default getStatus;

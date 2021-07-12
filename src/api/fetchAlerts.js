const fetchAlerts = async () => {
  const response = await fetch(`http://130.61.51.1/api/alerts`);

  const data = await response.json();

  return data;
};

export default fetchAlerts;

const fetchData = async (endpoint) => {
  const baseUrl = "http://localhost:3000/api";
  const response = await fetch(baseUrl + endpoint);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.log('ERROR');
  }
}

module.exports = {
  fetchData
}
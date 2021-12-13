const fetchData = async (endpoint, signal) => {
  const baseUrl = "http://localhost:3000/api";
  const response = await fetch(baseUrl + endpoint, {signal});
  if (response) {
    const data = await response.json();
    return data;
  } else {
    console.log('network error');  // need to handle this error!
  }
}

module.exports = {
  fetchData
}
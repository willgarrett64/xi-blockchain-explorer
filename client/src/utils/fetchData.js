const fetchData = async (endpoint, signal) => {
  const baseUrl = "./api";
  const response = await fetch(baseUrl + endpoint, {signal});
  if (response.status === 400 || !response) {
    return {error: 'fetch failed'}
  } else if (response) {
    const data = await response.json();
    return data;
  } else {
    console.log('network error');  // need to handle this error!
  }
}

module.exports = {
  fetchData
}
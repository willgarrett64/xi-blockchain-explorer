const fetch = require('node-fetch');

const fetchXi = async (endpoint) => {
  try {
    const apiUrl = 'https://xi.test.network'
    const response = await fetch(apiUrl + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {fetchXi}

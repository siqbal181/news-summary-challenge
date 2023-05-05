const apiKey = require('./config.js');
const apiUrl = `https://content.guardianapis.com/search?api-key=${apiKey}`;

class NewsClient {
  async loadData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status code ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error loading data from API: ${error.message}`);
    }
  }
}

module.exports = NewsClient;

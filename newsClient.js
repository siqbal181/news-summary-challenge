const apiKey = require('./config.js');
const apiUrl = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail`;

class NewsClient {
  async loadData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status code ${response.status}`);
      }
      const data = await response.json();
      const articles = data.response.results.map(article => {
        return {
          title: article.webTitle,
          url: article.webUrl,
          image: article.fields ? article.fields.thumbnail : null
        };
      });
      return articles;
    } catch (error) {
      throw new Error(`Error loading data from API: ${error.message}`);
    }
  }
}


module.exports = NewsClient;

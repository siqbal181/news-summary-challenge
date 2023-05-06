const apiKey = require('./config.js');

class NewsClient {
  async loadData(searchTerm = null) {
    if (searchTerm === '') {
      searchTerm = '&query-fields';
    }
    try {
      const response = await fetch(`https://content.guardianapis.com/search?q=${searchTerm}&api-key=${apiKey}&show-fields=thumbnail`);
      if (!response.ok) {
        throw new Error(`API request failed with status code ${response.status}`);
      }
      const data = await response.json();
      const articles = data.response.results.map(article => ({
        title: article.webTitle,
        url: article.webUrl,
        image: article.fields?.thumbnail
      }))
      return { response: {results: articles} };
    } catch (error) {
      throw new Error(`Error loading data from API: ${error.message}`);
    }
  }
}

module.exports = NewsClient;

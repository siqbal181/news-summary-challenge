class NewsModel {
  constructor() {
    this.articles = [];
  }
  setArticles(data) {
    if (Array.isArray(data)) {
      this.articles = data;
    } else {
      this.articles = data.response.results;
    }
  }

  getArticles() {
    return this.articles;
  }
}

module.exports = NewsModel;
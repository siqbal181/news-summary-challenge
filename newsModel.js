class NewsModel {
  constructor() {
    this.articles = [];
  }
  setArticles(articles) {
    this.articles = articles;
  }

  getArticles() {
    return this.articles;
  }
}

module.exports = NewsModel;
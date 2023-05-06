class NewsView {
  constructor(model, client) {
    this.model = model,
    this.client = client,
    this.mainContainerEl = document.querySelector('#main-container');
  }

  async loadArticles() {
    const data = await this.client.loadData();
    this.model.setArticles(data.response.results);
    this.displayArticles();
  }

  displayArticles() {
    const allArticles = this.model.getArticles();
    allArticles.forEach(article => {
      const articleEl = document.createElement('div');
      articleEl.className = 'article';
      articleEl.textContent = article;
      articleEl.innerText = article.innerText;
      this.mainContainerEl.append(articleEl);
    })
  }

}

module.exports = NewsView;
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
      articleEl.innerText = article.title;
      this.imageElement(article);
      this.mainContainerEl.append(articleEl);
    })
  }

  imageElement(article) {
    const articleImg = document.createElement('img');
    articleImg.src = article.image;
    articleImg.alt = 'Image of news article';
    this.mainContainerEl.append(articleImg);
  }

  urlElement(article) {
    const articleUrl = document.createElement('a');
    articleUrl.href = article.url
    articlarticle.Url.textContent = 'News Article URL';
    this.mainContainerEl.append(articleUrl);
  }

}

module.exports = NewsView;
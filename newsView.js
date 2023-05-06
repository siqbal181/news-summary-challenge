class NewsView {
  constructor(model, client) {
    this.model = model,
    this.client = client,
    this.mainContainerEl = document.querySelector('#articles-container');
  }

  async loadArticles() {
    const data = await this.client.loadData();
    this.model.setArticles(data.response.results);
    this.displayArticles();
  }

  displayArticles() {
    const allArticles = this.model.getArticles();
    allArticles.forEach(article => {
      this.titleElement(article);
      this.imageElement(article);
      this.urlElement(article);
    })
  }

  titleElement(article) {
    const articleEl = document.createElement('div');
    articleEl.className = 'article-title';
    articleEl.textContent = article;
    articleEl.innerText = article.title;
    this.mainContainerEl.append(articleEl);
  }

  imageElement(article) {
    const articleImg = document.createElement('img');
    articleImg.className = 'article-image';
    articleImg.src = article.image;
    articleImg.alt = article.title;
    this.mainContainerEl.append(articleImg);
  }

  urlElement(article) {
    const articleUrl = document.createElement('a');
    articleUrl.href = article.url
    articleUrl.textContent = 'Link To Story';
    this.mainContainerEl.append(articleUrl);
  }

}

module.exports = NewsView;
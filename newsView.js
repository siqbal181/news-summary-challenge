class NewsView {
  constructor(model, client) {
    this.model = model,
    this.client = client,
    this.articleContainerEl = document.querySelector('#articles-container');
    this.mainContainerEl = document.querySelector('#main-container');
    this.searchButtonEl = document.querySelector('#search-button');
    this.searchArticle();
  }

  searchArticle() {
    this.searchButtonEl.addEventListener('click', async () => {
      const searchInput = document.querySelector('#search-bar').value;
      const data = await this.client.loadData(searchInput);
      this.model.setArticles(data.response.results);
      this.displayArticles();
    })
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
    const articleEl = document.createElement('p');
    articleEl.className = 'article-title';
    articleEl.textContent = article.title;
    articleEl.innerText = article.title;
    this.articleContainerEl.append(articleEl);
  }

  imageElement(article) {
    const articleImg = document.createElement("img");
    articleImg.className = "article-image";
    if (article.image !== undefined) { // add a check for undefined image URL
      articleImg.src = article.image;
      articleImg.alt = article.title;
    } else { // assign a default image when the image URL is undefined
      articleImg.src = "https://via.placeholder.com/150x150.png?text=No+image+available";
      articleImg.alt = "No image available";
    }
    this.articleContainerEl.append(articleImg);
  }

  urlElement(article) {
    const articleUrl = document.createElement('a');
    articleUrl.href = article.url
    articleUrl.textContent = 'Link To Story';
    this.articleContainerEl.append(articleUrl);
  }

}

module.exports = NewsView;
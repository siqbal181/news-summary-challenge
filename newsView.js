class NewsView {
  constructor(model, client) {
    this.model = model,
    this.client = client,
    this.mainContainerEl = document.querySelector('#main-container');
  }

  async loadArticles() {
    const data = await this.client.loadData();
    this.model.setArticles(data);
    console.log(data)
  }

}

module.exports = NewsView;
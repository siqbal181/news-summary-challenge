class NewsView {
  constructor(model, client) {
    this.model = model,
    this.client = client,
    this.mainContainerEl = document.querySelector('#main-container');
  }

  async displayArticles() {
    // const data = await this.client.loadData();
    // console.log(data)
  }

}

module.exports = NewsView;
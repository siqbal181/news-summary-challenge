(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // config.js
  var require_config = __commonJS({
    "config.js"(exports, module) {
      module.exports = "d90c2e53-e60d-4726-b435-cc6241cc7727";
    }
  });

  // newsClient.js
  var require_newsClient = __commonJS({
    "newsClient.js"(exports, module) {
      var apiKey = require_config();
      var NewsClient2 = class {
        async loadData(searchTerm = null) {
          if (searchTerm === "") {
            searchTerm = "&query-fields";
          }
          try {
            const response = await fetch(`https://content.guardianapis.com/search?q=${searchTerm}&api-key=${apiKey}&show-fields=thumbnail`);
            if (!response.ok) {
              throw new Error(`API request failed with status code ${response.status}`);
            }
            const data = await response.json();
            const articles = data.response.results.map((article) => ({
              title: article.webTitle,
              url: article.webUrl,
              image: article.fields?.thumbnail
            }));
            return { response: { results: articles } };
          } catch (error) {
            throw new Error(`Error loading data from API: ${error.message}`);
          }
        }
      };
      module.exports = NewsClient2;
    }
  });

  // newsModel.js
  var require_newsModel = __commonJS({
    "newsModel.js"(exports, module) {
      var NewsModel2 = class {
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
      };
      module.exports = NewsModel2;
    }
  });

  // newsView.js
  var require_newsView = __commonJS({
    "newsView.js"(exports, module) {
      var NewsView2 = class {
        constructor(model2, client2) {
          this.model = model2, this.client = client2, this.articleContainerEl = document.querySelector("#articles-container");
          this.mainContainerEl = document.querySelector("#main-container");
          this.searchButtonEl = document.querySelector("#search-button");
        }
        searchArticle() {
          this.searchButtonEl.addEventListener("click", async () => {
            const searchInput = document.querySelector("#search-bar").value;
            const data = await this.client.loadData(searchInput);
            this.model.setArticles(data.response.results);
            this.displayArticles();
          });
        }
        async loadArticles() {
          const data = await this.client.loadData();
          this.model.setArticles(data.response.results);
          this.displayArticles();
        }
        displayArticles() {
          const allArticles = this.model.getArticles();
          allArticles.forEach((article) => {
            this.titleElement(article);
            this.imageElement(article);
            this.urlElement(article);
          });
        }
        titleElement(article) {
          const articleEl = document.createElement("p");
          articleEl.className = "article-title";
          articleEl.textContent = article;
          articleEl.innerText = article.title;
          this.articleContainerEl.append(articleEl);
        }
        imageElement(article) {
          const articleImg = document.createElement("img");
          articleImg.className = "article-image";
          if (article.image !== void 0) {
            articleImg.src = article.image;
            articleImg.alt = article.title;
          } else {
            articleImg.src = "https://via.placeholder.com/150x150.png?text=No+image+available";
            articleImg.alt = "No image available";
          }
          this.articleContainerEl.append(articleImg);
        }
        urlElement(article) {
          const articleUrl = document.createElement("a");
          articleUrl.href = article.url;
          articleUrl.textContent = "Link To Story";
          this.articleContainerEl.append(articleUrl);
        }
      };
      module.exports = NewsView2;
    }
  });

  // index.js
  var NewsClient = require_newsClient();
  var NewsModel = require_newsModel();
  var NewsView = require_newsView();
  console.log("The news app is running");
  var client = new NewsClient();
  var model = new NewsModel();
  var view = new NewsView(model, client);
  console.log(client.loadData());
  view.loadArticles();
})();

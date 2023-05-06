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
      var apiUrl = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail`;
      var NewsClient2 = class {
        async loadData() {
          try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error(`API request failed with status code ${response.status}`);
            }
            const data = await response.json();
            const articles = data.response.results.map((article) => ({
              title: article.webTitle,
              url: article.webUrl,
              image: article.fields?.thumbnail
            }));
            return articles;
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
        setArticles(articles) {
          this.articles = articles;
        }
        getArticles() {
          return this.articles;
        }
      };
      module.exports = NewsModel2;
    }
  });

  // index.js
  var NewsClient = require_newsClient();
  var NewsModel = require_newsModel();
  console.log("The news app is running");
  var client = new NewsClient();
  client.loadData();
})();

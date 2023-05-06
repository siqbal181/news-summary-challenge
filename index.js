const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');
const NewsView = require('./newsView');

console.log('The news app is running')
const client = new NewsClient();
const model = new NewsModel();
const view = new NewsView();

console.log(client.loadData());
const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');

console.log('The news app is running')
const client = new NewsClient();

console.log(client.loadData());
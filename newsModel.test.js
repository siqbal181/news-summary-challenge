const NewsModel = require('./newsModel');

describe('NotesModel', () => {
  beforeEach(() => {
    model = new NewsModel();
  })

  it('returns an empty array when initialized', () => {
    expect(model.getArticles()).toEqual([]);
  })

  it('sets the articles in the article array', () => {
    model.setArticles(['Football news', 'Politics news'])
    expect(model.getArticles()).toEqual(['Football news', 'Politics news']);
  })
})
/**
 * @jest-environment jsdom
 */

const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();
jest.mock('./newsClient');

const fs = require('fs');
const NewsView = require('./newsView');
const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');

describe('News View', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    NewsClient.mockClear();
    document.body.innerHTML = fs.readFileSync('./index.html');
  })

  test.only('shows the news pages from API', async () => {
    const model = new NewsModel();
    const mockClient = {
      loadData: jest.fn()
    };

    mockClient.loadData.mockResolvedValueOnce({
      response: {
        results: [
          {
            webTitle: "County cricket",
            webUrl: "https://www.theguardian.com/sport/live/2023",
            fields: {
              thumbnail: "img.jpg"
            }
          },
          {
            webTitle: "Home Decor",
            webUrl: "https://www.theguardian.com/home/decor/2023",
            fields: {
              thumbnail: "home.jpg"
            }
          }
        ]
      }
    });

    const view = new NewsView(model, mockClient);
    await view.loadArticles();
    const divs = document.querySelectorAll('p.article-title');
    expect(divs.length).toEqual(2);
  });
})

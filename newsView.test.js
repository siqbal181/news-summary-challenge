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

  test('shows the news pages from API', async () => {
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

  test.only('it returns listings for specific search term', async () => {
    const model = new NewsModel();
    const mockClient = {
      loadData: jest.fn()
    };

    mockClient.loadData.mockResolvedValueOnce({
      response: {
        results: [
          {
            webTitle: "Football news 1",
            webUrl: "https://www.theguardian.com/football/1",
            fields: {
              thumbnail: "img1.jpg"
            }
          },
          {
            webTitle: "Football news 2",
            webUrl: "https://www.theguardian.com/football/2",
            fields: {
              thumbnail: "img2.jpg"
            }
          }
        ]
      }
    });  

    const view = new NewsView(model, mockClient);

    const searchInput = document.querySelector('#search-bar');
    searchInput.value = 'football';
    const searchButton = document.querySelector('#search-button');
    searchButton.dispatchEvent(new Event('click'));

    await new Promise(resolve => setTimeout(resolve, 1000));
    const divs = document.querySelectorAll('p.article-title');
    expect(divs.length).toEqual(2);
    console.log(divs[0]);
    expect(divs[0].textContent).toEqual('Football news 1');
    expect(divs[0].textContent).toEqual('Football news 2');

  })
})

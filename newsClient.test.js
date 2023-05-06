const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

const NewsClient = require('./newsClient');

describe('NewsClient', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('loads data from API and returns expected response', async () => {
    const client = new NewsClient();
  
    fetch.mockResponseOnce(JSON.stringify({
      response: {
        results: [
          {
            webTitle: "County cricket",
            webUrl: "https://www.theguardian.com/sport/live/2023",
            fields: {
              thumbnail: "img.jpg"
            }
          }
        ]
      }
    }));
  
    const result = await client.loadData();
    expect(result.response.results).toHaveLength(1);
    expect(result.response.results[0].title).toBe("County cricket");
    expect(result.response.results[0].url).toBe("https://www.theguardian.com/sport/live/2023");
    expect(result.response.results[0].image).toBe("img.jpg");
  });  

  it('handles errors from API', async () => {
    const client = new NewsClient();

    fetch.mockRejectOnce(new Error('API is down'));

    await expect(client.loadData()).rejects.toThrow('API is down');
  });
})

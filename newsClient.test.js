const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

const NewsClient = require('./newsClient');

describe('NewsClient', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('loads data from API and returns expected response', async () => {
    const client = new NewsClient();

    fetch.mockResponseOnce(JSON.stringify({
      webTitle: "County cricket",
      webUrl: "https://www.theguardian.com/sport/live/2023",
      thumbnail: "img.jpg"
    }));

    const result = await client.loadData();
    expect(result.webTitle).toBe("County cricket");
    expect(result.webUrl).toBe("https://www.theguardian.com/sport/live/2023");
    expect(result.thumbnail).toBe("img.jpg");
  });

  it('handles errors from API', async () => {
    const client = new NewsClient();

    fetch.mockRejectOnce(new Error('API is down'));

    await expect(client.loadData()).rejects.toThrow('API is down');
  });
})

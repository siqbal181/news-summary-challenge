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
      type: "article",
      sectionName: "Film"
    }));

    const result = await client.loadData();
    expect(result.type).toBe("article");
    expect(result.sectionName).toBe("Film");
  });

  it('handles errors from API', async () => {
    const client = new NewsClient();

    fetch.mockRejectOnce(new Error('API is down'));

    await expect(client.loadData()).rejects.toThrow('API is down');
  });
})

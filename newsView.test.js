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
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync('./index.html');
  })

  it('shows the news pages from API', () => {

  })
})
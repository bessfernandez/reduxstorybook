/**
 * @jest-environment node
 */
import * as nock from 'nock';
import request, { client } from './api';

describe('API tests', () => {
  const getData = async (url: string): Promise<any> => {
    const response = request({
      url,
      method: 'GET',
    });
    return response;
  };
  afterEach(() => {
    nock.cleanAll();
  });
  describe('creates HTTP client', () => {
    it('with baseURL by default', () => {
      expect(client.defaults.baseURL).toEqual('http://localhost:3012/');
    });
    it('returns successful response', async () => {
      // mock HTTP server with nock
      nock('http://localhost:3012')
        .get('/api/foods')
        .reply(200, {
          items: ['pizza', 'hotdogs', 'milkshake'],
        });
      const myResult = await getData('/api/foods');
      expect(myResult.data).toEqual({ items: ['pizza', 'hotdogs', 'milkshake'] });
    });
    it('returns error response with status', async () => {
      // mock HTTP server with nock
      nock('http://localhost:3012')
        .get('/api/faux')
        .reply(500);
      const myResult = await getData('/api/faux');
      expect(myResult.status).toEqual(500);
    });
    it('returns error response with error message', async () => {
      // mock HTTP server with nock
      nock('http://localhost:3012')
        .get('/api/faux')
        .replyWithError('oh noes');
      const myResult = await getData('/api/faux');
      expect(myResult).toEqual('oh noes');
    });
    it('returns error response with error message as response object', async () => {
      // mock HTTP server with nock
      nock('http://localhost:3012')
        .get('/api/faux')
        .replyWithError({
          message: 'something awful happened',
        });
      const myResult = await getData('/api/faux');
      expect(myResult).toEqual('something awful happened');
    });
  });
});

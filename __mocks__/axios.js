import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

jest.unmock('axios');

const mock = new MockAdapter(axios);
mock.create = jest
  .fn()
  .mockReturnValue({ defaults: { transformRequest: [], transformResponse: [] } });

afterEach(() => {
  mock.reset();
});

export default mock;

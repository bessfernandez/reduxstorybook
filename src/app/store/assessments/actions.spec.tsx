/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as nock from 'nock';
import { updateAssessmentsConfig, getAssessmentsConfig } from './actions';
import { ASSESSMENTS_CONFIG_REQUESTED } from './types';

describe('Assessments actions tests', () => {
  // create mock store with correct middlewares
  const mockStore = configureStore([thunk]);
  describe('dispatches updateAssessmentsConfig action correctly', () => {
    const store = mockStore();
    beforeEach(() => {
      store.clearActions();
    });
    afterEach(() => {
      nock.cleanAll();
    });
    it('returns expected action and payload', () => {
      const samplePayload = {
        config: {},
      };
      const expectedActions = [
        {
          payload: samplePayload,
          type: ASSESSMENTS_CONFIG_REQUESTED,
        },
      ];

      store.dispatch(updateAssessmentsConfig(samplePayload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('dispatches getAssessmentsConfig action correctly', () => {
    const store = mockStore();
    beforeEach(() => {
      store.clearActions();
    });
    afterEach(() => {
      nock.cleanAll();
    });
    it('returns expected action and payload', async () => {
      const samplePayload = {
        config: {
          items: ['pizza', 'hotdogs', 'milkshake'],
        },
      };
      const expectedActions = [
        {
          payload: samplePayload,
          type: ASSESSMENTS_CONFIG_REQUESTED,
        },
      ];

      // mock HTTP call with nock
      nock('http://localhost:3012')
        .post('/api/swyk')
        .reply(200, {
          items: ['pizza', 'hotdogs', 'milkshake'],
        });

      // @ts-ignore
      return store.dispatch(getAssessmentsConfig()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedActions[0]);
      });
    });
  });
});

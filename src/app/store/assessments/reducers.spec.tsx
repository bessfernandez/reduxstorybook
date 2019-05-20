import assessmentsReducer, { initialState } from './reducers';
import { ASSESSMENTS_CONFIG_REQUESTED } from './types';

describe('Assessments reducer', () => {
  it('returns initialState when no type set', () => {
    const samplePayload = {
      config: { request: {} },
    };
    const result = assessmentsReducer(initialState, {
      payload: samplePayload,
      type: null,
    });
    expect(result).toBe(initialState);
    expect(result).not.toContain(samplePayload);
  });
  it('returns action payload on `ASSESSMENTS_CONFIG_REQUESTED`', () => {
    const samplePayload = {
      config: { request: {} },
    };
    const result = assessmentsReducer(initialState, {
      payload: samplePayload,
      type: ASSESSMENTS_CONFIG_REQUESTED,
    });
    expect(result).not.toBe(initialState);
    expect(result).toEqual(samplePayload);
  });
});

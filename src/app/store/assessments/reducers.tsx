import { ASSESSMENTS_CONFIG_REQUESTED, AssessmentsState, AssessmentsActionTypes } from './types';

export const initialState: AssessmentsState = {
  config: {
    request: {
      items: [],
    },
  },
};

export function assessmentsReducer(
  state = initialState,
  action: AssessmentsActionTypes,
): AssessmentsState {
  switch (action.type) {
    case ASSESSMENTS_CONFIG_REQUESTED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

export default assessmentsReducer;

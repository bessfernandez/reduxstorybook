import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as uuid from 'uuid/v4';

import { ApplicationState } from '../index';
import request from '../../../utils/api';

import {
  AssessmentsState,
  UpdateAssessmentsConfigAction,
  ASSESSMENTS_CONFIG_REQUESTED,
} from './types';

const apiPaths = {
  swyk: 'api/swyk',
};

/**
 * Sample config data
 */
const configSample = {
  activityId: 'cf7a159c-3deb-4e9b-8f02-8650c42fc683',
  ltiUserGuid: 'be08e411-4b08-459c-9a68-44ce171c7da4',
  sessionId: uuid(),
  enrollmentId: 1,
  primaryOutcomeGuid: '29301af1-b0fa-465e-85ad-e605fa75f398',
  tcLtiGuid: 'b8306cb7-0dce-450a-bfca-7202db58e733',
  ltiContextId: '007c66c0-550a-4971-b829-8842f8ed6f49',
  skills: ['12ede71c-397c-41e1-bcc2-02f50b353bed', '7634d446-10a2-4b58-8dd0-906dcbab44a8'],
};

/**
 * Sample header(s) data
 */
const headersSample = {
  Authorization:
    'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnJvbnRlIiwiaWF0IjoxNTU2MzAzOTIxOTEyLCJzY29wZXMiOlsiaW50ZXJhY3Rfd2l0aF9sZWFybm9zaXR5Il0sImF1ZCI6ImFjdGl2aXRpZXNfc2VydmljZXMifQ.NccEWcdGPM3eIvJqHjUKIB5MRRYgI7Xh0N1OOQ8dhn2WDEsf-UP2xvVf_9XG4dlMFYm9_VErCHQU0RBZOyGhig',
  'Content-Type': 'application/json',
};

/**
 * Get data from API via axios `get()` - will eventually be built out
 * more when proper API integration is in place
 * @param url
 */
export const getAssessmentsData = async (url: string): Promise<any> => {
  const response = request({
    url,
    method: 'POST',
    data: configSample,
    headers: headersSample,
  });
  return response;
};

export function updateAssessmentsConfig(
  assessmentsConfig: AssessmentsState,
): UpdateAssessmentsConfigAction {
  return {
    type: ASSESSMENTS_CONFIG_REQUESTED,
    payload: assessmentsConfig,
  };
}

export const getAssessmentsConfig = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<string>
> => async dispatch => {
  // TODO - pass in quiz type as param so not hardcoded
  const asyncResp: any = await getAssessmentsData(apiPaths.swyk);

  // NOTE: This example only assumes successful response
  // we would also be handling failure cases here for
  // the API request and dispatching those actions accordingly
  dispatch(
    updateAssessmentsConfig({
      config: asyncResp.data,
    }),
  );
};

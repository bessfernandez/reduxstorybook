/**
 * The shape of Assessments state
 */
export interface AssessmentsState {
  readonly config: {
    request?: {
      items?: string[];
    };
  };
}

/**
 * Different action names available for Assessments
 */
export const ASSESSMENTS_CONFIG_REQUESTED = 'ASSESSMENTS_CONFIG_REQUESTED';
export const ASSESSMENTS_CONFIG_RECEIVED = 'ASSESSMENTS_CONFIG_RECEIVED';

export interface UpdateAssessmentsConfigAction {
  type: typeof ASSESSMENTS_CONFIG_REQUESTED;
  payload: AssessmentsState;
}
export type AssessmentsActionTypes = UpdateAssessmentsConfigAction;

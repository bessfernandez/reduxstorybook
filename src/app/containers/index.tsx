/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import { connect } from 'react-redux';
import { RouterState } from 'connected-react-router';

import { getAssessmentsConfig } from '../store/assessments/actions';

import { ApplicationState, AdditionalConnectedProps } from '../store';
import { AssessmentsState } from '../store/assessments/types';
import { learnosityRenderedElementId } from '../../utils/learnosity';

import LearnosityWrapper from '../containers/assessments';
import SWYKComponent from './swyk';
import Button from '../components/atoms/button';

interface PropsFromState {
  assessments: AssessmentsState;
  router: RouterState;
}

interface PropsFromDispatch {
  getAssessmentsConfig: typeof getAssessmentsConfig;
}

declare global {
  interface Window {
    LearnosityItems: any;
  }
}

type AllProps = PropsFromState & PropsFromDispatch & AdditionalConnectedProps;

export class App extends React.Component<AllProps> {
  componentDidMount() {
    /**
     * Dispatch Redux action to get assessments config
     */
    if (this.props.match.params.quizType === 'swyk') {
      this.props.getAssessmentsConfig();
    }
  }

  componentDidUpdate(prevProps: PropsFromState) {
    /**
     * We need our configuration object populated in state before we can initialize Learnosity to render assessments -
     * so we use `componentDidUpdate()` to watch for when props change from not having to config -> to having config
     * and also double checking config actually has at least one key/value pair - if so we intialize Learnosity passing
     * in our config to render Assessments
     */
    if (
      Object.keys(this.props.assessments.config).length &&
      this.props.assessments.config !== prevProps.assessments.config
    ) {
      this.initializeLearnosityConfiguration(this.props.assessments.config);
    }
  }

  initializeLearnosityConfiguration = (learnosityConfiguration: Record<string, any>) => {
    if (learnosityConfiguration) {
      if (!window.LearnosityItems) {
        throw new Error(
          'You must include the Learnosity items script before accessing global LearnosityAuthor object',
        );
      }

      /**
       * Event options to pass into the Learnosity Author initialization -
       * mainly serves to provide callbacks after initialization, still in progress
       * https://reference.learnosity.com/author-api/events#on
       */
      const eventOptions = {
        readyListener: () => {},
      };

      /**
       * Initialize Learnosity with assessments config - relies on `LearnosityAuthor` on
       * window object- fetched from root `index.html`
       */
      window.LearnosityItems.init(learnosityConfiguration, eventOptions);
    }
  };

  render(): React.ReactElement {
    let quizItems;
    if (this.props.assessments.config.request) {
      quizItems = this.props.assessments.config.request.items;
    }
    return (
      <div>
        <h1>Welcome to your Assessment</h1>

        <LearnosityWrapper learnosityRootId={learnosityRenderedElementId}>
          <SWYKComponent>
            {quizItems &&
              quizItems.map(item => {
                return <span key={item} className="learnosity-item" data-reference={item} />;
              })}
            {/* Below is required elemnt Learnosity uses to know where to place submit button  -
                Note that actual class name doesn't end up represented in DOM :( */}
            <span className="learnosity-submit-button" />
            {/* Example of actual Button component */}
            <Button size="small">Oh look a button!</Button>
          </SWYKComponent>
        </LearnosityWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    assessments: state.assessments,
    router: state.router,
  };
};

const mapDispatchToProps = {
  getAssessmentsConfig,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

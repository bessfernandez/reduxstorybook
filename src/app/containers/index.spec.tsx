import * as React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from '../../test-utils';

import ConnetedApp, { App } from './index';

describe('App container tests', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    assessments: {
      config: {
        request: {},
      },
    },
  });
  it('renders by default', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnetedApp match={{ params: { quizType: 'swyk' }, isExact: true, url: '', path: '' }} />
      </Provider>,
    );
    expect(wrapper.find(ConnetedApp)).toHaveLength(1);
  });
  describe('`getAssessmentsConfig` action', () => {
    let props: any;
    beforeEach(() => {
      props = {
        getAssessmentsConfig: jest.fn(),
        assessments: {
          config: {
            request: {},
          },
        },
        match: {
          params: {
            quizType: 'swyk',
          },
        },
      };
      mount(<App {...props} />);
    });
    it('dispatches on mount', () => {
      jest.spyOn(props, 'getAssessmentsConfig');
      expect(props.getAssessmentsConfig).toHaveBeenCalledTimes(1);
    });
    it('does not dispatch on mount when path is incorrect', () => {
      props = {
        getAssessmentsConfig: jest.fn(),
        assessments: {
          config: {
            request: {},
          },
        },
        match: {
          params: {
            quizType: 'totally-bogus-path',
          },
        },
      };
      jest.spyOn(props, 'getAssessmentsConfig');
      expect(props.getAssessmentsConfig).toHaveBeenCalledTimes(0);
    });
  });
  describe('Global Learnosity config', () => {
    let props: any;
    let wrapper: any;
    beforeEach(() => {
      window.LearnosityItems = {
        init: jest.fn(),
      };
      props = {
        getAssessmentsConfig: jest.fn(),
        assessments: {
          config: {
            request: {},
          },
        },
        match: {
          params: {
            quizType: 'swyk',
          },
        },
      };
      wrapper = mount(<App {...props} />);
    });
    afterEach(() => {
      // reset needed init function for overall component to render after
      // any vals may have been reset
      window.LearnosityItems = {
        init: jest.fn(),
      };
    });
    it('initializes with correct params', () => {
      const config = {};
      wrapper.instance().initializeLearnosityConfiguration(config);
      jest.spyOn(window.LearnosityItems, 'init');
      // assert that global `LearnosityItems` has been invoked with init as expected
      expect(window.LearnosityItems.init).toHaveBeenCalledTimes(1);
      expect(window.LearnosityItems.init.mock.calls[0][0]).toBe(config);
      // currently we have `readyListener` baked into component, this may be passed in as part of config,
      // for now just asserting it exists as the types we expect and are needed by Learnosity - Learnosity expects
      // exact types and names
      // https://reference.learnosity.com/items-api/initialization#example
      expect(typeof window.LearnosityItems.init.mock.calls[0][1]).toBe('object');
      expect(typeof window.LearnosityItems.init.mock.calls[0][1].readyListener).toBe('function');
    });
    it('throws error when LearnosityItems does not exist', () => {
      window.LearnosityItems = null;
      const config = {};
      function fn() {
        return wrapper.instance().initializeLearnosityConfiguration(config);
      }
      expect(fn).toThrow();
    });
    it('dispatches on config update', () => {
      wrapper.instance().initializeLearnosityConfiguration = jest.fn();
      wrapper.setProps({ assessments: { config: { request: { oh: 'i am a new val' } } } });
      expect(wrapper.instance().initializeLearnosityConfiguration).toHaveBeenCalledTimes(1);
    });
  });
  describe('Quiz items', () => {
    let props: any;
    let wrapper: any;
    beforeEach(() => {
      props = {
        getAssessmentsConfig: jest.fn(),
        assessments: {
          config: {
            request: {
              items: ['hi', 'another', 'hotdog!'],
            },
          },
        },
        match: {
          params: {
            quizType: 'swyk',
          },
        },
      };
      wrapper = shallow(<App {...props} />);
    });
    it('render when there are items', () => {
      // TODO replace with finding specific component once QuizItem components are build out
      expect(wrapper.find('.learnosity-item')).toBeDefined();
      expect(wrapper.find('.learnosity-item')).toHaveLength(3);
    });
    it('do not render when they are no items', () => {
      // TODO replace with finding specific component once QuizItem components are build out
      wrapper.setProps({ assessments: { config: { request: { items: [] } } } });
      expect(wrapper.find('.learnosity-item')).toHaveLength(0);
    });
  });
});

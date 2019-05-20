import * as React from 'react';
import { mount } from '../../../test-utils';

import LearnosityAssessmentsWrapper from './index';

describe('Assessment container', () => {
  it('renders by default', () => {
    const wrapper = mount(<LearnosityAssessmentsWrapper learnosityRootId="fauxid" />);
    expect(wrapper.find(LearnosityAssessmentsWrapper)).toHaveLength(1);
  });
  it('renders`learnosityRootId` as DOM id', () => {
    const fakeId = 'fauxid';
    const wrapper = mount(<LearnosityAssessmentsWrapper learnosityRootId={fakeId} />);
    // check that provided id exists in page as DOM element
    expect(wrapper.find(`#${fakeId}`)).toHaveLength(1);
  });
});

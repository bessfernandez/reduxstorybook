import * as React from 'react';
import { mount } from '../../../test-utils';

import SWYKComponent from './index';

describe('SWYK container tests', () => {
  it('renders by default', () => {
    const wrapper = mount(<SWYKComponent />);
    expect(wrapper.find(SWYKComponent)).toHaveLength(1);
  });
});

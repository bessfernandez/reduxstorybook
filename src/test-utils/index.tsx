/**
 * Utility file for Jest which sets up needed config for Enzyme and testing
 * React components.
 * Included as needed in any test file and import `mount` or `shallow` for use:
 * https://github.com/airbnb/enzyme#basic-usage
 */
import * as Enzyme from 'enzyme';
import * as ADAPTER from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ADAPTER() });

export const { mount, shallow } = Enzyme;

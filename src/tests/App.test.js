import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from '../App';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('Component: App', () => {
  it('should match its empty snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});

import React from 'react'
import { shallow } from 'enzyme'
import SignupPage from './SignupPage';

describe('<SignupPage />', () => {
  it('Renders without crashing', () => {
    shallow(<SignupPage />)
  });
});
import React from 'react'
import { shallow } from 'enzyme'
import SigninPage from './SigninPage';

describe('<SigninPage />', () => {
  it('Renders without crashing', () => {
    shallow(<SigninPage />)
  });
});
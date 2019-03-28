import React from 'react';
import { shallow } from 'enzyme';

import SigninForm from './SigninForm';

describe('<SigninPage />', () => {
  it('Renders without crashing', () => {
    shallow(<SigninForm/>);
  });
});
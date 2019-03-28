import React from 'react'
import { shallow } from 'enzyme'

import SignupForm from './SignupForm'

describe('<SignupPage />', () => {
  it('Renders without crashing', () => {
    shallow(<SignupForm />)
  });

//   it('Renders a submited form', () => {
//     const fakeEvent = { preventDefault: () => console.log('preventDefault') };
//     const wrapper = shallow(<SignupForm />);
//     expect(wrapper.find('form').length).toBe(1);
//     wrapper.find('form').simulate('submit', fakeEvent);
//     expect(wrapper.find(Notification).length).toBe(1);
//   });
});
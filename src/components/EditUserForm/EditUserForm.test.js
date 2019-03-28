import React from 'react'
import { shallow } from 'enzyme'

import EditUserForm from './EditUserForm'

describe('<EditUserForm />', () => {

  it('Renders without crashing', () => {
    shallow(<EditUserForm />)
  })
})
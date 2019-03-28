import React from 'react'
import { shallow } from 'enzyme'

import AnswerForm from './AnswerForm'

describe('<AnswerForm />', () => {
  it('Renders without crashing', () => {
    shallow(<AnswerForm />)
  })
})
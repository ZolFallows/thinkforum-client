import React from 'react'
import { shallow } from 'enzyme'

import QuestionForm from './QuestionForm'

describe('<QuestionForm />', () => {
  it('Renders without crashing', () => {
    shallow(<QuestionForm />)
  })
})
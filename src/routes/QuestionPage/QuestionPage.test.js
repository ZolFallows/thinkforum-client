import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import QuestionPage from './QuestionPage'

describe('<QuestionPage />', () => {
  it('Renders without crashing', () => {
    shallow(
        <MemoryRouter>
           <QuestionPage /> 
        </MemoryRouter>
        )
  })
})
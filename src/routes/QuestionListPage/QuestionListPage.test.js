import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import QuestionListPage from './QuestionListPage'

describe('<QuestionListPage />', () => {
  it('Renders without crashing', () => {
    shallow(
        <MemoryRouter>
           <QuestionListPage /> 
        </MemoryRouter>
        )
  })
})
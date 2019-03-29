import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import AddQuestionPage from './AddQuestionPage';

describe('<AddQuestionPage />', () => {
  it('Renders without crashing', () => {
    shallow(
        <MemoryRouter>
           <AddQuestionPage /> 
        </MemoryRouter>
        )
  })
})
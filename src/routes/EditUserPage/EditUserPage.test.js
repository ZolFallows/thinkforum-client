import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import EditUserPage from './EditUserPage';

describe('<EditUserPage />', () => {
  it('Renders without crashing', () => {
    shallow(
        <MemoryRouter>
           <EditUserPage /> 
        </MemoryRouter>
        )
  })
})
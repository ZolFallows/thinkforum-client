import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import UserPage from './UserPage';

describe('<UserPage />', () => {
  it('Renders without crashing', () => {
    shallow(
        <MemoryRouter>
           <UserPage /> 
        </MemoryRouter>
        )
  })
})
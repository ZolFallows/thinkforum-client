import React from 'react'
import { shallow } from 'enzyme'

import UserProfile from './UserProfile'


describe(`UserProfile Component`, () => {
    it('renders witout crashing', () => {
        shallow(<UserProfile />)
    })
})

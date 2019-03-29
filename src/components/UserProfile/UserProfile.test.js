import React from 'react';
import {mount} from 'enzyme';

import UserProfile from './UserProfile';
import TokenService from '../../services/token-service';

describe(`UserProfile Component`, () => {
    it('renders witout crashing', () => {
        TokenService.saveAuthToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjAsImlhdCI6MTUxNjIzOTAyMn0._Lg12A5PSFc8xIb1sgHq1KAE9RHw7W1fgKq5n6QmCuY'
        )
        mount(<UserProfile />)
    })
})
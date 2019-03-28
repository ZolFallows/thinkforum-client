import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import QuestionItem from './QuestionItem'

const sectionProp = {
                        id: 7,
                        title: "Another discussion",
                        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
                        tags: "react",
                        date_created: "2019-03-27T20:27:19.481Z",
                        user: {
                            id: 1,
                            user_name: "jones",
                            full_name: "John Jones",
                            date_created: "2019-03-27T20:27:19.481Z"
                        },
                        number_of_answers: 4
                    }


describe(`QuestionItem Component`, () => {

    it('renders witout crashing', () => {
        shallow(<QuestionItem />)  
    })

    it('renders empty given no QuestionItem without errors', () => {
        const wrapper = shallow(<QuestionItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders given QuestionItem without errors', () => {
        const wrapper = shallow(<QuestionItem question={sectionProp} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})

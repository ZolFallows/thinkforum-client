import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import QuestionListItem from './QuestionListItem'

const sectionProp = {
                        "id": 2,
                        "title": "Another discussion",
                        "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
                        "tags": "javascript,react",
                        "date_created": "2019-03-27T20:27:19.481Z",
                        "user": {
                            "id": 2,
                            "user_name": "b.deboop",
                            "full_name": "Bodeep Deboop",
                            "date_created": "2019-03-27T20:27:19.481Z"
                        },
                        "number_of_answers": 1
                    }


describe(`QuestionListItem Component`, () => {
    it('Renders without crashing', () => {
        shallow(<QuestionListItem />)
      });

    it('renders empty given no QuestionListItem without errors', () => {
        const wrapper = shallow(<QuestionListItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders given QuestionListItem without errors', () => {
        const wrapper = shallow(<QuestionListItem question={sectionProp} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})
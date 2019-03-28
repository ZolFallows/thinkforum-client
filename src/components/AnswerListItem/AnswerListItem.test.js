
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AnswerListItem from './AnswerListItem'

const sectionProp = {
                        "id": 8,
                        "text": "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
                        "user": {
                            "id": 3,
                            "user_name": "c.bloggs",
                            "full_name": "Charlie Bloggs",
                            "date_created": "2019-03-27T20:27:19.481Z"
                        },
                        "date_created": "2019-03-27T20:27:19.481Z"
                    }


describe(`AnswerListItem Component`, () => {
    it('Renders without crashing', () => {
        shallow(<AnswerListItem/>)
      });

    it('renders empty given no AnswerListItem without errors', () => {
        const wrapper = shallow(<AnswerListItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders given AnswerListItem without errors', () => {
        const wrapper = shallow(<AnswerListItem answer={sectionProp} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})

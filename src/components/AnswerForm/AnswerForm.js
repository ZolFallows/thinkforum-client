import React, { Component } from 'react'
import { Button } from  '../Utils/Utils'
import QuestionContext from '../../contexts/QuestionContext'
import QuestionApiService from '../../services/question-api-service'
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "draft-js/dist/Draft.css";

export default class AnswerForm extends Component {
    static contextType = QuestionContext
    static defaultProps = {
        onAddAnswerValid: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
          value: '',
          tab: 'write',
        }
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true
        })
      }

          // ======== markdown editor ========
    handleTabChange = tab => {
        this.setState({ tab });
      }
    
    handleValueChange = (value) => {
        this.setState({ value });
    }

    handleJwtAuthSubmit = (e) => {
        e.preventDefault();
        this.setState({error: null})
        const { question } = this.context
        const text = this.state.value
        // const { text } = e.target

        QuestionApiService
            .postAnswer(question.id, text)
            .then(res => {
                this.setState({value: ''})
                console.log(res)
                this.context.addAnswer(res)
            })
            .catch(this.context.setError)
    }

    render() {
        return (
            <form className="AnswerForm" onSubmit={this.handleJwtAuthSubmit}>
                {/* <Textarea 
                    title='body'
                    name='text'
                    id='text'
                    cols='30'
                    rows='8'
                    placeholder='Type...'
                    required
                /> */}
                <ReactMde
                    onChange={this.handleValueChange}
                    onTabChange={this.handleTabChange}
                    value={this.state.value}
                    generateMarkdownPreview={markdown =>
                    Promise.resolve(this.converter.makeHtml(markdown))
                    }
                    selectedTab={this.state.tab}
                />
                <Button 
                    title='Submit' 
                    type='submit'
                    className='New_answer_btn' 
                />
            </form>
        )
    }
}
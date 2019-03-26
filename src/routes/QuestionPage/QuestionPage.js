import React, { Component } from 'react'
import QuestionContext from '../../contexts/QuestionContext'
import QuestionApiService from '../../services/question-api-service'
import QuestionItem from '../../components/QuestionItem/QuestionItem'
import AnswerListItem from '../../components/AnswerListItem/AnswerListItem'
import AnswerForm from '../../components/AnswerForm/AnswerForm'
import './QuestionPage.css'

export default class QuestionPage extends Component {

    static contextType = QuestionContext

    componentDidMount() {
        const { questionId } = this.props.match.params
        // console.log(questionId)
        // clear error 
        this.context.clearError()
        // fetch and update state with question
        QuestionApiService
            .getQuestionById(questionId)
            .then(this.context.setQuestion)
            .catch(this.context.setError)
        // fetch and update state with answers 
        QuestionApiService
            .getAnswersByQuestionId(questionId)
            .then(this.context.setAnswers)
            .catch(this.context.setError)
      }

    componentWillMount(){
        // clear state 
        this.context.clearQuestion()
        this.context.clearAnswers()
    }

    handleAddAnswerValid = () => {
        const { questionId } = this.props.match.params
        this.props.history.push(`/questions/${questionId}`)
    }

    renderQuestion(){
        const { question, answers } = this.context
        return  <>
                    <QuestionItem question={question} />
                    <div className="AnswerList">
                        {answers.map(answer => 
                                    <AnswerListItem key={answer.id} answer={answer}/>
                                )
                        }
                    </div>
 
                    <AnswerForm onAddAnswerValid={this.handleAddAnswerValid}/>
                </>
    }


    render(){
        const { error, question } = this.context
        let content;
        
        if(error){
            content = (error.error === "Question doesn't exist")
                ? <p className='error'>Question NOT found!</p>
                : <p className='error'>There was an error!</p>
        } else if(!question.id){
            content = <div className="loading"></div>
        } else {
            content = this.renderQuestion();
        }

        return (
            <section className='QuestionPage'>
                {content}
            </section>
        )
    }
}

import React, { Component } from 'react'
import QuestionListContext from '../../contexts/QuestionListContext'
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem'
import UserProfile from '../../components/UserProfile/UserProfile'
// import UsersApiService from '../../services/users-api-service'
import QuestionApiService from '../../services/question-api-service'
import './UserPage.css'

export default class UserPage extends Component {
    static contextType = QuestionListContext

    componentDidMount(){
        this.context.clearError()
        QuestionApiService
            .getQuestions()
            .then(this.context.setQuestionList)
            .catch(this.context.setError)
    }

    handleDeleteQuestion = (id) =>{
        QuestionApiService
            .deleteQuestion(id)
            .then(res => {
                this.context.deleteQuestion(id)
            })
            .catch(this.context.setError)
    }


    renderUserQuestions(){
        let { questionList = [] } = this.context
        const { userId } = this.props.match.params
        return  questionList.filter(question => question.user.id === Number(userId))
                            .map(question => 
                                    <QuestionListItem
                                        key={question.id}
                                        question={question}
                                        handleDelete={this.handleDeleteQuestion}
                                        isUser={true}
                                    />
                                )
    }

    render() {
        const { userId } = this.props.match.params

        return (
            <div>
                <div className="User_info">
                    <UserProfile userId={ userId } />
                </div>
                <div className="Question_list">
                    <div className="List_header">
                        <h3>Discussions</h3>
                    </div>
                    {this.renderUserQuestions()} 
                </div>
            </div>
        )
        
    }
}
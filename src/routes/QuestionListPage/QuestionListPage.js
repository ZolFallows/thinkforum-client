import React, { Component } from 'react'
import QuestionListContext from '../../contexts/QuestionListContext'
import QuestionApiService from '../../services/question-api-service'
import TokenService from '../../services/token-service'
import { Button } from '../../components/Utils/Utils'
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem'
import './QuestionListPage.css'

export default class QuestionListPage extends Component {
    static contextType = QuestionListContext

    state = {
        isSignIn: null
    }

    componentDidMount() {
        this.context.clearError()
        this.context.setShowSearchBar(true)
        QuestionApiService
            .getQuestions()
            .then(this.context.setQuestionList)
            .catch(this.context.setError)
    }

    componentWillUnmount() {
        this.context.setShowSearchBar(false)
    }

      handleNewQuestion = () => {
        //Only direct to 'addquestion' route if authToken is visible
        if(TokenService.hasAuthToken()){
           const { history } = this.props;
           this.setState({ isSignIn: false })
           history.push("/add_question") 
        }else{
            this.setState({ isSignIn: true })
        }
          
      }

      renderNewQuestionButton(){
          return (<div className="List_header">
                    <h3>Discussions</h3>
                    {this.state.isSignIn ? <p className="signin_msg">Please sign in to post new discussion!</p> : ''}
                    <Button
                        title='Create discussion'
                        className='New_question_btn'
                        type="button"
                        onClick={this.handleNewQuestion}
                    />
                  </div>
          )
      }

    renderQuestions() {
        let { questionList = [] } = this.context
        // console.log(questionList)
        if(this.context.searchTerm !== ''){
            let search = this.context.searchTerm.toLocaleLowerCase()
            questionList = questionList.filter(question => question.title
                .toLowerCase()
                .includes(search)
                )
        }
        return questionList.sort((a, b) => {
                                    let aTime = new Date(a.date_created)
                                    let bTime = new Date(b.date_created)
                                    return bTime.getTime() - aTime.getTime() 
                                })
                                .map(question =>
                                    <QuestionListItem
                                        key={question.id}
                                        question={question}
                                    />
                                )
      }



    render(){
        const { error } = this.context
        return (
            <section className='QuestionListPage'>
                {this.renderNewQuestionButton()}
                {error ? <p className='error'>There was an error, try again</p>
                : this.renderQuestions()}
            </section>
        )
    }
}
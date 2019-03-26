import React, { Component } from 'react'

const QuestionListContext = React.createContext({
    questionList: [],
    searchTerm: '',
    showSearchBar: null,
    error: null,
    setQuestionList: () => {},
    deleteQuestion: () => {},
    setError: () => {},
    clearError: () => {},
    setSearchTerm: () => {},
    setShowSearchBar: () => {},
})

export default QuestionListContext

export class QuestionListProvider extends Component {
    state = {
        questionList: [],
        searchTerm: '',
        showSearchBar: true,
        error: null,
    }

    setQuestionList = questionList => {
        // console.log(questionList)
        this.setState({ questionList })
    }

    setSearchTerm = searchTerm => {
        this.setState({searchTerm})
    }

    setShowSearchBar = show => {
        // console.log(show)
        this.setState({showSearchBar: show})
    }

    setError = error => {
        // console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    deleteQuestion = id => {
        const newQuestionList = this.state.questionList.filter(question => question.id !== id)
        this.setState({questionList: newQuestionList})
    }


    render(){
        const contextValue = {
            questionList: this.state.questionList,
            searchTerm: this.state.searchTerm,
            showSearchBar: this.state.showSearchBar,
            error: this.state.error,
            
            setQuestionList: this.setQuestionList,
            deleteQuestion: this.deleteQuestion,
            setError: this.setError,
            clearError: this.clearError,
            setSearchTerm: this.setSearchTerm,
            setShowSearchBar: this.setShowSearchBar,
        }
        return (
            <QuestionListContext.Provider value={contextValue}>
                {this.props.children}
            </QuestionListContext.Provider>
        )
    }
}
import React, { Component } from 'react'

// export const nullQuestion = {}

const QuestionContext = React.createContext({
    question: {},
    answers: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setQuestion: () => {},
    clearQuestion: () => {},
    setAnswers: () => {},
    addAnswer: () => {},
    clearAnswers: () => {}
})

export default QuestionContext

export class QuestionProvider extends Component {
    state = {
        question: {},
        answers: [],
        error: null,
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
        this.setState({ error: null })
    }

    setQuestion = question => {
        // console.log(question)
        this.setState({ question })
    }

    clearQuestion = () => {
        this.setQuestion({})
    }

    setAnswers = answers => {
        // console.log(answers)
        this.setState({answers})
    }

    clearAnswers = () => {
        this.setAnswers([])
    }

    addAnswer = (answer) => {
        this.setAnswers([
            ...this.state.answers,
            answer
        ])
    }

    render(){
        // console.log(this.state.question)
        // console.log(this.state.answers)
        const contextValue = {
            question: this.state.question,
            answers: this.state.answers,
            error: this.state.error,

            setError: this.setError,
            clearError: this.clearError,

            setQuestion: this.setQuestion,
            clearQuestion: this.clearQuestion,

            setAnswers: this.setAnswers,
            addAnswer: this.addAnswer,
            clearAnswers: this.clearAnswers,
        }
        return (
            <QuestionContext.Provider value={contextValue}>
                {this.props.children}
            </QuestionContext.Provider>
        )
    }
}
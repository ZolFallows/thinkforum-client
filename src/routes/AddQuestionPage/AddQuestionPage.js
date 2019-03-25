import React, { Component } from 'react'
import QuestionForm from '../../components/QuestionForm/QuestionForm'


export default class AddQuestionPage extends Component {

    handleAddQuestionValid = () => {
        this.props.history.push('/')
    }

    render(){
        return (
            <section className="Container_form">
                <QuestionForm onAddQuestionValid={this.handleAddQuestionValid}/>
            </section>
        )
    }
}
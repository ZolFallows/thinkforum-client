import React, { Component } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'

export default class SigninPage extends Component {
    
    handleSignupValid = () => {
        this.props.history.push('/')
    }

    render(){
        return (
            <section className="Container_form">
                <h2>Sign Up</h2>
                <SignupForm onSignupValid={this.handleSignupValid}/>
            </section>
        )
    }
}
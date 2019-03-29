import React, { Component } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import './SignupPage.css'
export default class SignupPage extends Component {
    
    handleSignupValid = () => {
        this.props.history.push('/signin')
    }

    render(){
        return (
            <section className="Container_form">
                <h2>Create a new account</h2>
                <SignupForm onSignupValid={this.handleSignupValid}/>
            </section>
        )
    }
}
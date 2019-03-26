import React, { Component } from 'react'
import SigninForm from '../../components/SigninForm/SigninForm'
import './SigninPage.css'
export default class SigninPage extends Component {
    
    handleSigninValid = () => {
        this.props.history.push('/')
    }

    render(){
        return (
            <section className="Container_form">
                <h2>Sign In</h2>
                <SigninForm onSigninValid={this.handleSigninValid}/>
            </section>
        )
    }
}
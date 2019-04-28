import React , { Component } from 'react'
import { Button, Input} from  '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'

export default class SigninForm extends Component {
    static defaultProps = {
        onSigninValid: () => {}
    }

    state = {error: null}

    handleJwtAuthSubmit = (e) => {
        e.preventDefault();
        this.setState({error: null})
        const { user_name, password } = e.target
        AuthApiService.postSignin({
                user_name: user_name.value,
                password: password.value
            })
            .then(res => {
                user_name.value = ''
                password.value = '' 
                this.props.onSigninValid()
            })
            .catch(res => {
                this.setState({ error: res.error})
            })
        
    }

    handleDemoLogin = () => {
        AuthApiService.postSignin({
            user_name: 'demo',
            password: 'password'
        })
        .then(res => {
            this.props.onSigninValid()
        })
        .catch(res => {
            this.setState({ error: res.error})
        })
    }

    render() {
        const { error } = this.state
        return (
            <form className="SigninForm" onSubmit={this.handleJwtAuthSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <Input 
                    title='Username'
                    name='user_name'
                    type='text'
                    id='Signin_user_name'
                    placeholder={"Username..."}
                />
                <Input 
                    title='Password'
                    name='password'
                    type='password'
                    id='Signin_user_password'
                    placeholder={"Password..."}
                />
                <div className="sign-btns">
                    <Button
                        title='Sign In' 
                        type='submit'
                        className='Signin_btn' 
                    />                
                    <Button
                        onClick={this.handleDemoLogin}
                        title='*Demo' 
                        type='button'
                        className='Demo_btn' 
                    />
                </div>
            </form>
        )
    }
} 
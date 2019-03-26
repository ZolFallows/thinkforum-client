import React , { Component } from 'react'
import { Button, Input } from  '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'

export default class SignupForm extends Component {
    static defaultProps = {
        onSignupValid: () => {}
    }

    state = { 
        error: null,
        // genderOptions: ['Male', 'Female', 'Others'],
        // skillOptions: ['Front-end', 'Back-end', 'Design', 'Testing']
    }

    handleJwtAuthSubmit = (e) => {
        e.preventDefault();
        const { full_name, user_name, new_password } = e.target
        this.setState({error: null})

        AuthApiService
            .postSignup({
                full_name: full_name.value,
                user_name: user_name.value,
                password: new_password.value
            })
            .then(res=> {
                full_name.value = ''
                user_name.value = ''
                new_password.value = ''
                this.props.onSignupValid()
            })
            .catch(res => {
                this.setState({error: res.error})
            })    
    }

    render() {
        const { error } = this.state
        return (
            <form className="SignupForm" onSubmit={this.handleJwtAuthSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <Input 
                    title='Full Name'
                    name='full_name'
                    type='text'
                    id='Signup_full_name'
                    placeholder={"Full Name..."}
                    required
                />
                {/* <Input 
                    title='Age' 
                    name='age' 
                    type='number' 
                    id='Signup_age' p
                    laceholder={"Age..."}
                /> */}
                <Input 
                    title='Username'
                    name='user_name'
                    type='text'
                    id='Signup_user_name'
                    placeholder={"Username..."}
                    required
                />
                <Input 
                    title='Password'
                    name='new_password'
                    type='password'
                    id='Signup_new_password'
                    placeholder={"New password..."}
                    required
                />
                {/* <Select 
                    title='Gender'
                    name='gender'
                    id='Signup_gender'
                    options={this.state.genderOptions}
                    placeholder='Select Gender'
                /> */}
                {/* <Checkbox title='Skills'
                    name='skills'
                    id='Signup-skills'
                    options={this.state.skillOptions}
                /> */}
                <Button
                    title='Submit' 
                    type='submit'
                    className='Signup_btn' 
                />
            </form>
        )
    }
} 
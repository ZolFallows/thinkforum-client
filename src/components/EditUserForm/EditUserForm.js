import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import UsersApiService from '../../services/users-api-service'
import { Button, Input, Textarea } from  '../Utils/Utils'

export default class EditUserForm extends Component {
    static contextType = UserContext

    static defaultProps = {
        onUpdateValid: () => {}
    }

    state = { 
        error: null,
    }

    handleJwtAuthSubmit = (e) => {
        e.preventDefault();
        const { full_name, title, location, content } = e.target
        const { userId }= this.props
        this.setState({error: null})
        console.log(full_name.value, title.value, location.value, content.value)
        console.log(userId)
        UsersApiService
            .updateUserById(userId, {
                full_name: full_name.value,
                title: title.value,
                location: location.value,
                content: content.value,
            })
            .then(res => {
                full_name.value = ''
                title.value = ''
                location.value = ''
                content.value = ''
                this.context.updateUser(res)
                this.props.onUpdateValid()
                console.log(res)
            })
            .catch(res => {
                this.setState({error: res.error})
            })
            // .postSignup({
            //     full_name: full_name.value,
            //     user_name: user_name.value,
            //     password: new_password.value
            // })
            // .then(res=> {
            //     full_name.value = ''
            //     user_name.value = ''
            //     new_password.value = ''
            //     this.props.onSignupValid()
            // })
            // .catch(res => {
            //     this.setState({error: res.error})
            // })    
    }

    render(){
        const { error } = this.state
        const { user } = this.context
        return (
            <form className="EditForm" onSubmit={this.handleJwtAuthSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <Input 
                    title='Full Name'
                    name='full_name'
                    type='text'
                    id='Signup_full_name'
                    defaultValue={user.full_name}
                    placeholder={"Enter your full Name"}
                    required
                />
                <Input 
                    title='Title'
                    name='title'
                    type='text'
                    id='update_location'
                    placeholder={"Enter your title"}
                />
                <Input 
                    title='Location'
                    name='location'
                    type='text'
                    id='update_location'
                    placeholder={"Enter your location"}
                />
                <Textarea 
                    title='About me'
                    name='content'
                    id='content'
                    cols='30'
                    rows='8'
                    placeholder="Summarise about yourself"
                />
                <Button
                    title='Save Profile' 
                    type='submit'
                    className='Submit_btn' 
                />
            </form>
        )
    }
}
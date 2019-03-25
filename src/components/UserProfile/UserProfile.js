import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import UserContext from '../../contexts/UserContext'
import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'

export default class UserProfile extends Component {
    static contextType = UserContext

    componentDidMount(){
        const { userId } = this.props
        this.context.clearError()
        UsersApiService
            .getUserById(userId)
            .then(this.context.setUser)
            .catch(this.context.setError)
    }

    render(){
        const { user, error } = this.context
        const payload = TokenService.readJwtToken()
        let content
        if(error){
                content = (error.error === "User doesn't exist")
                    ? <p className='error'>User NOT found!</p>
                    : <p className='error'>There was an error!</p>
            } else if(!user.id){
                content = <div className="loading"></div>
            } else {
                content =   <>
                                <div>
                                    <h2>{user.full_name}{' - '}{user.user_name}</h2>
                                    {user.title && <h3>{user.title}</h3>}
                                    <p>Location: {user.location? user.location : ``}</p>
                                </div>
                                <div>
                                    {user.content? <p>{user.content}</p> : <p>Your about me is currently blank</p>}
                                </div>
                                
                                {user.id === payload.user_id && 
                                    <Link to={`/edit/${user.id}`}>
                                        Click here to edit
                                    </Link>
                                }
                                <div>
                                    <span>Since <Moment format="D MMM YYYY" withTitle>{user.date_created}</Moment></span> 
                                </div>               
                            </>
            }
        return <>{content}</>
    }
}
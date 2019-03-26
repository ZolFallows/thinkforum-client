import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import UserContext from '../../contexts/UserContext'
import UsersApiService from '../../services/users-api-service'
import TokenService from '../../services/token-service'

export default class UserProfile extends Component {
    static contextType = UserContext

    componentDidMount(){
        this.fetchUser(this.props.userId)
    }

    componentDidUpdate(prevProps){
        if (this.props.userId !== prevProps.userId) {
            this.fetchUser(this.props.userId);
          }
    }

    fetchUser = (userId) =>{
        this.context.clearError()
        UsersApiService
            .getUserById(userId)
            .then(this.context.setUser)
            .catch(this.context.setError)
    }

    render(){
        // console.log(this.props.userId)
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
                                <div className="wrapper">
                                    <h2>{user.full_name}</h2>
                                    <p className="date_created">Since&#32;&#32;&#32;<Moment format="D MMM YYYY" withTitle>{user.date_created}</Moment></p>
                                </div>
                                <div className="user_detail">
                                    {user.title && <h3>{user.title}</h3>}
                                    {user.location? <p>Location: {user.location}</p> : <p className="blank">Your location is currently blank</p>}
                                    {user.content? <p>{user.content}</p> : <p className="blank">Your about me is currently blank</p>}
                                </div>
                                <div className="edit">
                                    {user.id === payload.user_id && 
                                        <Link to={`/edit/${user.id}`} className="edit_link">
                                            Click here to edit
                                        </Link>
                                    }
                                    
                                </div>
              
                            </>
            }
        return <>{content}</>
    }
}
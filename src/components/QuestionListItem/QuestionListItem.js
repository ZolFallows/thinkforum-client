import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import Moment from 'react-moment';
import './QuestionListItem.css'

export default class QuestionListItem extends Component {

    // renderToggleDelete(question) {
    //     const payload = TokenService.readJwtToken()
    //     return TokenService.hasAuthToken() && Number(payload.user_id) === Number(question.user.id) 
    //                 ? <div className="delete" onClick={this.handleDeleteQuestion}>Delete</div>
    //                 : <p>
    //                     <span><Link to={`/user/${question.user.id}`}>{question.user.full_name}</Link></span> 
    //                     {' - '} 
    //                     <span>{question.user.user_name}</span>
    //                   </p>
    // }

    render(){
        const { question, isUser } = this.props
        return (
            <div className="Question_group">
                <h3>
                    <Link to={`/questions/${question.id}`}>{question.title}</Link>
                </h3>
                {TokenService.hasAuthToken() && isUser
                    && TokenService.readJwtToken().user_id === question.user.id
                    ? <button className="delete" onClick={() => this.props.handleDelete(question.id)}>Delete</button>
                    : <p>
                        <span><Link to={`/user/${question.user.id}`}>{question.user.full_name}</Link></span> 
                        {' - '} 
                        <span>{question.user.user_name}</span>
                      </p>
                }
                <div>
                    <div className="Tags">
                            {question.tags.split(',').map(tag => <span key={tag} className="tag">{tag} </span>)}
                    </div>
                    <div>
                        <span><Moment fromNow>{question.date_created}</Moment></span>
                        {' - '}
                        <span>{question.number_of_answers}respond(s)</span>
                    </div>
                </div>
            </div>
        )
    }
}
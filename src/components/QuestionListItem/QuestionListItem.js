import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import Moment from 'react-moment';
import './QuestionListItem.css'

export default class QuestionListItem extends Component {

    renderQuestion(question, isUser){
        return (
            <div className="Question_group">
                <h3>
                    <Link to={`/questions/${question.id}`}>{question.title}</Link>
                </h3>
                {TokenService.hasAuthToken() && isUser
                    && TokenService.readJwtToken().user_id === question.user.id
                    ? <button className="delete_btn" onClick={() => this.props.handleDelete(question.id)}>Delete</button>
                    : <p className="user_name">
                        <span><Link to={`/user/${question.user.id}`}>{question.user.full_name}</Link></span> 
                        &nbsp;&nbsp;
                        <span>{question.user.user_name}</span>
                    </p>
                }
                <div className="discussion_info">
                    <div className="Tags">
                            {question.tags.split(',').map(tag => <span key={tag} className="tag">{tag} </span>)}
                    </div>
                    <div className="date_number">
                        <span><Moment fromNow>{question.date_created}</Moment></span>
                        &nbsp;&nbsp;&nbsp;
                        <span >{question.number_of_answers}&nbsp;respond(s)</span>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const { question, isUser } = this.props
        return <>{question ? this.renderQuestion(question, isUser) : ''}</>
    }
}
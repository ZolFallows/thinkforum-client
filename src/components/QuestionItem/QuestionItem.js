import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import parse from 'html-react-parser'
import Showdown from "showdown"
import './QuestionItem.css'

export default class QuestionItem extends Component {
    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true
        })
      }

    render() {
        const { question } = this.props
        // console.log(question)
        return (
            <>
                <div className="User">
                    <h5>
                        <span><Link to={`/user/${question.user.id}`}>{question.user.full_name}</Link></span> 
                        {' - '} 
                        <span>{question.user.user_name}</span>
                    </h5>
                </div>
                <div className="Question_item">
                    <h3>{question.title}</h3>
                    <div className="Content">
                        {parse(this.converter.makeHtml(question.content))}
                    </div>
                    <div className="Question_info">
                        <div className="Tags">
                            {question.tags.split(',').map(tag => <span key={tag} className="tag">{tag} </span>)}
                        </div>
                        <div>
                            <p className="Posted_date"><Moment fromNow>{question.date_created}</Moment></p>
                            <p className="Answer_number">{question.number_of_answers} respond(s)</p>  
                        </div>
                        
                    </div>
                </div>
            </>

        )
    }
}
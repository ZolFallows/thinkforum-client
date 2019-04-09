import React, { Component } from 'react'
import Moment from 'react-moment'
import parse from 'html-react-parser'
import Showdown from "showdown"
import './AnswerListItem.css'
export default class AnswerListItem extends Component {
    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true
        })
      }

    renderAnswer(answer){
        return (
            <div className="Answer_box">
                <div className="Answer_header">
                    <p className="full_name">{answer.user.full_name}</p>
                    <p className="date_created"><Moment fromNow>{answer.date_created}</Moment></p>
                </div>
                <div className="text">
                    {parse(this.converter.makeHtml(answer.text))}
                </div>
            </div>
        )
    }

    render(){
        const { answer } = this.props
        return <>{answer ? this.renderAnswer(answer) : ''}</>
    }
}
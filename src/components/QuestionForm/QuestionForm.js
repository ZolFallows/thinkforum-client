import React , { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import QuestionApiService from '../../services/question-api-service'
import ReactMde from "react-mde";
import Showdown from "showdown";
import { TAGS } from './Tags';
import { Input, Button } from  '../Utils/Utils'
import "react-mde/lib/styles/css/react-mde-all.css";
import "draft-js/dist/Draft.css";
import './QuestionForm.css'


const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class SigninForm extends Component {
    static defaultProps = {
        onAddQuestionValid: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
          value: "Type...",
          tab: 'write',
          error: null,
          tags: [{id: "general", text: "general" }, {id: "interview", text: "interview" }],
          suggestions: TAGS,
        }
        this.converter = new Showdown.Converter({
          tables: true,
          simplifiedAutoLink: true
        })
      }

    // state = {
    //     error: null,
    //     tags: [{id: "general", text: "general" }, {id: "interview", text: "interview" }],
    //     suggestions: TAGS,
    // }

    // ======== markdown editor ========
    handleTabChange = tab => {
        this.setState({ tab });
      }
    
      handleValueChange = (value) => {
        this.setState({ value });
      }
    

    // ======== tags input ========
    handleDelete = (i) => {
        this.setState({
          tags: this.state.tags.filter((tag, index) => index !== i),
        })
      }
    
    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] }))
      }
    
    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        this.setState({ tags: newTags });
    }

    // parseCode = (str1) => {
    //     let array1;
    //     let result = '';
    //     let idx = 0;
    //     const regex1 = RegExp(/```(.*?)```/g);
      
    //     while ((array1 = regex1.exec(str1)) !== null) {
    //       const code = '<code>' + array1[0].slice(3, array1[0].length-3) + '</code>';
    //       result += str1.slice(idx, regex1.lastIndex-array1[0].length) + code
    //       idx = regex1.lastIndex;
    //     }
    //     return result += str1.slice(idx);
    //   }

    handleJwtAuthSubmit = (e) => {
        e.preventDefault();
        this.setState({error: null})
        const tags = this.state.tags.map(tag => tag.text)
        const content = this.state.value 
        const { title } = e.target
        console.log('title:', title.value)
        console.log('tags:', tags)
        console.log('MDE:', content)

        QuestionApiService
            .postQuestion(title.value, content, tags)
            .then(res => {
                title.value = ''
                // content.value = ''
                this.setState({tags: []})
                this.props.onAddQuestionValid()
            })
            .catch(res => {
                this.setState({ error: res.error})
            })
        
    }

    render() {
        const { error, tags, suggestions } = this.state
        return (
            <form className='QuestionForm' onSubmit={this.handleJwtAuthSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <Input 
                    title='Create a new discussion'
                    name='title'
                    type='text'
                    id='Form_title'
                    placeholder={'What is your question?'}
                    required
                />
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                />
                <ReactMde
                    onChange={this.handleValueChange}
                    onTabChange={this.handleTabChange}
                    value={this.state.value}
                    generateMarkdownPreview={markdown =>
                    Promise.resolve(this.converter.makeHtml(markdown))
                    }
                    selectedTab={this.state.tab}
                />
                <Button 
                    title='Post discussion' 
                    type='submit'
                    className='New_question_submit_btn' 
                />
            </form>
        )
    }
} 
import config from '../config' 
import TokenService from './token-service'


const QuestionApiService = {
    getQuestions(){
        return  fetch(`${config.API_ENDPOINT}/questions`, {
                    headers: {}
                })
                .then(res => {
                    return (!res.ok) 
                            ? res.json().then(error => Promise.reject(error))
                            : res.json() 
                })
    },

    getQuestionById(question_id){
        return  fetch(`${config.API_ENDPOINT}/questions/${question_id}`, {
                        headers:  {'Authorization': `Bearer ${TokenService.getAuthToken()}`},
                })
                .then(res => {
                    // console.log(res)
                    return (!res.ok) 
                            ? res.json().then(error => Promise.reject(error))
                            : res.json() 
                })
    },

    getAnswersByQuestionId(question_id){
        return  fetch(`${config.API_ENDPOINT}/questions/${question_id}/answers`, {
                    headers:  {'Authorization': `Bearer ${TokenService.getAuthToken()}`}
                })
                .then(res => {
                    return (!res.ok) 
                            ? res.json().then(error => Promise.reject(error))
                            : res.json() 
                })
    },

    postQuestion(title, content, tags){
        return fetch(`${config.API_ENDPOINT}/questions`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        tags,
                    })
                })
                .then(res => {
                    return (!res.ok) 
                            ? res.json().then(error => Promise.reject(error))
                            : res.json() 
                })
    },

    postAnswer(question_id, text){
        return fetch(`${config.API_ENDPOINT}/answers`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({
                       text,
                       question_id
                    })
                })
                .then(res => {
                    return (!res.ok) 
                            ? res.json().then(error => Promise.reject(error))
                            : res.json() 
                })
    },

    deleteQuestion(question_id){
        return fetch(`${config.API_ENDPOINT}/questions/${question_id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok) 
                            ? Promise.reject()
                            : '' 
                })
    }


}

export default QuestionApiService
import config from '../config' 
import TokenService from './token-service'

const UsersApiService = {
    getUserById(userId){
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
                        headers:  {'Authorization': `Bearer ${TokenService.getAuthToken()}`},
                    })
                    .then(res => {
                        return (!res.ok) 
                                ? res.json().then(error => Promise.reject(error))
                                : res.json() 
                    })
    },

    updateUserById(userId, updatedData){
        return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${TokenService.getAuthToken()}`  
                        },
                        body: JSON.stringify(updatedData)    
                    })
                    .then(res => {
                        return (!res.ok) 
                                ? res.json().then(error => Promise.reject(error))
                                : res.json() 
                    })
    }
}

export default UsersApiService
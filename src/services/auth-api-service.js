import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const AuthApiService = {
    postSignin(creds){
        return fetch(`${config.API_ENDPOINT}/auth/signin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(creds)
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)
            IdleService.regiserIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
              AuthApiService.postRefreshToken()
            })
            return res
        })
    },

    postSignup(newUser){
        return fetch(`${config.API_ENDPOINT}/user`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        })
        
    },

    postRefreshToken(){
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res => 
            (!res.ok) 
            ? res.json().then(e => Promise.reject(e)) 
            : res.json()
          )
          .then(res => {
            TokenService.saveAuthToken(res.authToken)
    
            TokenService.queueCallbackBeforeExpiry(() => {
              AuthApiService.postRefreshToken()
            })
          })
          .catch(error => {
              console.log('refresh token request error')
              console.error(error)
            })
      },
}

export default AuthApiService
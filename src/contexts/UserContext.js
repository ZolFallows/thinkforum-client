import React, { Component } from 'react'

const UserContext = React.createContext({
    user: {},
    error: null,

    setError: () => {},
    clearError: () => {},
    setUser: () => {},
    updateUser: () => {},
})

export default UserContext

export class UserProvider extends Component {
    state = {
        user: {},
        error: null
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setUser = (user)=>{
        this.setState({user})
    }

    updateUser = updatedUser => {
        this.setUser(updatedUser)
    }


    render(){
        const contextValue = {
            user: this.state.user,
            error: this.state.error,

            setError: this.setError,
            clearError: this.clearError,
            setUser: this.setUser,
            updateUser: this.updateUser
        }
        return (
            <UserContext.Provider value={contextValue}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
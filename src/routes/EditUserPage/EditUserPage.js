import React, { Component } from 'react'

import EditUserForm from '../../components/EditUserForm/EditUserForm'

export default class EditUserPage extends Component {


    handleUpdateValid = () => {
        const { userId } = this.props.match.params
        this.props.history.push(`/user/${userId}`)
    }

    render(){
        const { userId } = this.props.match.params
        return (
            <div className="EditUserPage">
                <EditUserForm  onUpdateValid={this.handleUpdateValid} userId={userId}/>
            </div>
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import TokenService from '../../services/token-service'
import IdleService from '../../services/idle-service'
import QuestionListContext from '../../contexts/QuestionListContext'
import { SearchBar} from '../../components/Utils/Utils'
import './Header.css'


class Header extends Component {
    static contextType = QuestionListContext
   

    handleSignOutClick = () => {
        //clear authtoken, refresh authtoken, idle service
        TokenService.clearAuthToken() 
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()  
    }

    handleSearch = (e) => {
         this.context.setSearchTerm(e.target.value)
    }


    renderSignIn(){
        return (
            <div className="not_signed_in">
                <Link to={"/signin"}>Sign in</Link>
                {' / '}
                <Link to={"/signup"}>Sign up</Link>
            </div>
        )
    }

    renderUser(){
        const payload = TokenService.readJwtToken()
        return (
            <div className="signed_in">
                <Popup
                    trigger={<div className="user_name">{payload.full_name}</div>}
                    position="bottom left"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none', width: '100px' }}
                    arrow={false}
                    >
                    <div className="menu">
                        <Link className="user_profile" to={`/user/${payload.user_id}`}>User Profile</Link>
                        <Link className="user_sign_out" to={'/'} onClick={this.handleSignOutClick}>Sign Out</Link>
                    </div>
                </Popup>
            </div>
        )
    }

    render(){
        const { showSearchBar } = this.context
        return (
            <nav className="Header">
                <div className="Logo">
                    <Link to='/'>
                        <span>Think</span><span>Forum</span>
                    </Link>
                </div>
                <div className="Search_field">
                {showSearchBar &&
                    <SearchBar 
                        className='Search_text'
                        type='text'
                        placeholder={"Search..."}
                        value={this.context.searchTerm}
                        onChange={this.handleSearch}
                    />
                }
                </div>
                <div className="User_status">
                    {TokenService.hasAuthToken()
                    ? this.renderUser()
                    : this.renderSignIn()}
                </div>
                
            </nav>
        )
    }
}

export default Header
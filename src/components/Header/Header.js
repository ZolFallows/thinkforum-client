import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Popup from 'reactjs-popup'
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
                <Link to={"/signin"} id="signin">Sign in</Link>
                <Link to={"/signup"} id="signup">Register</Link>
            </div>
        )
    }

    renderUser(){
        const payload = TokenService.readJwtToken()
        return (
            <div className="signed_in">
                {/* <Popup
                    trigger={<div className="user_name">
                                <span className="initial">{payload.full_name[0].toUpperCase()}</span>{payload.full_name}
                            </div>}
                    position="bottom left"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none', width: '80px', top: '50px', zIndex: '1'}}
                    arrow={false}
                    >
                    <div className="menu">
                        <Link className="user_profile" to={`/user/${payload.user_id}`}>Profile</Link>
                        <Link className="user_sign_out" to={'/'} onClick={this.handleSignOutClick}>Sign Out</Link>
                    </div>
                </Popup> */}
                    <div className="user_name">
                        <span className="initial">{payload.full_name[0].toUpperCase()}</span>
                        <span className="full_name">{payload.full_name}</span>
                    </div>
                    <div className="dropdown-content">
                        <Link className="user_profile" to={`/user/${payload.user_id}`}>Profile</Link>
                        <Link className="user_sign_out" to={'/'} onClick={this.handleSignOutClick}>Sign Out</Link>
                    </div>
            </div>
        )
    }

    render(){
        const { showSearchBar } = this.context
        return (
            <nav className="Header">
                <div className="Logo">
                    <Link to='/'>
                        <span id="think">Think</span><span id="forum">Forum</span>
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
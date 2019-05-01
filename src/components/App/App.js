import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-service'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import QuestionListPage from '../../routes/QuestionListPage/QuestionListPage'
import SigninPage from '../../routes/SigninPage/SigninPage'
import SignupPage from '../../routes/SignupPage/SignupPage'
import AddQuestionPage from '../../routes/AddQuestionPage/AddQuestionPage'
import QuestionPage from '../../routes/QuestionPage/QuestionPage'
import UserPage from '../../routes/UserPage/UserPage'
import EditUserPage from '../../routes/EditUserPage/EditUserPage'
import './App.css'


class App extends Component {
  state = {
    hasError : false
  }

  // In the event of an error within the component getDerivedStateFromError runs
  // and updates state with the error that has occured.
  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  } 
  
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()

      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    
    IdleService.unRegisterIdleResets()
    this.forceUpdate()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App_header">
          <Header />
        </header>
        <main>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>
            <Route exact path={'/'} component={QuestionListPage}/>
            {/* Public routes */}
            <PublicOnlyRoute path={'/signin'} component={SigninPage}/>
            <PublicOnlyRoute path={'/signup'} component={SignupPage}/>
            {/* Private routes */}
            <PrivateRoute path={'/add_question'} component={AddQuestionPage}/>
            <PrivateRoute path={'/questions/:questionId'} component={QuestionPage}/>
            <PrivateRoute path={'/user/:userId'} component={UserPage} />
            <PrivateRoute path={'/edit/:userId'} component={EditUserPage} />
          </Switch>
        </main>
        <footer className="App_footer">
          <Footer />
        </footer>

      </div>
    );
  }
}

export default App;

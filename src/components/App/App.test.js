import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../../contexts/UserContext'
import { QuestionListProvider } from '../../contexts/QuestionListContext'
import { QuestionProvider } from '../../contexts/QuestionContext'
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <QuestionListProvider>
            <QuestionProvider>
                <UserProvider>
                    <App />
                </UserProvider> 
            </QuestionProvider>       
        </QuestionListProvider> 
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

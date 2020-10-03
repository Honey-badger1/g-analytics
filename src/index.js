import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GitService from './services/';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import GitServiceContext from './components/git-service-context';
import ErrorBoundry from './components/error-boundary';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store';

const gitService=new GitService(); 
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
    <GitServiceContext.Provider value={gitService} >
   <Router>
   <App />
   </Router>
    </GitServiceContext.Provider>


    </ErrorBoundry>
    
   
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

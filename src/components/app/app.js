import React, {Component, useReducer } from 'react';
import {MainPage, LoginPage, HomePage} from '../pages';
import { initialState, authentication } from "../../reducers/auth-reducer";
import {AuthContext} from '../git-service-context';

import './app.css';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App(){
 

    


    
    
        const [state, dispatch] = useReducer(authentication, initialState);

        return (
          <AuthContext.Provider
            value={{
              state,
              dispatch
            }}
          >
          <Router>
            <Switch>
              <Route path="/login" exact component={LoginPage}/>
              <Route path="/" exact component={HomePage}/>
              <Route path="/repo" exact component={MainPage}/>
            </Switch>
          </Router>
          </AuthContext.Provider>
        );
 

    

}


export default App;


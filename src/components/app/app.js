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
          <Router basename={"https://honey-badger1.github.io/g-analytics"} >
            <Switch>
              <Route exact path="/login"  component={LoginPage}/>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/repo" component={MainPage}/>
            </Switch>
          </Router>
          </AuthContext.Provider>
        );
 

    

}


export default App;


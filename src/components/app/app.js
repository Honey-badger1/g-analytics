import React, {Component} from 'react';
import {MainPage} from '../pages';
import './app.css';


import { Route, Switch } from 'react-router-dom';

export default class App extends Component{

 

    

render(){
    return(
        <>
        <Switch>
        <Route path='/' exact component={MainPage }/>
        </Switch>
        </>
    )}

}


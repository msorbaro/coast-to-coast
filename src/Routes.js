import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import fire from './config/Fire.js';
import {ProtectedRoute} from './ProtectedRoute';
import history from './history';
import Signin from "./Signin";
import PollBoard from "./PollBoard";
import UserComponent from "./UserComponent";
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{}, 
        };
    }
    componentDidMount(){
        this.authListener();
    }
    //authentication stuff below 
    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if(user){
                this.setState({user});
                // localStorage.setItem('user', user.uid);
            }
            else{
                this.setState({user: null});
                // localStorage.removeItem('user');
            }
        });
    }
    render() {
        return (
            <div className = "App">
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Signin} />
                        <Route path="/SignUp" component={SignUp} />
                        <Route path="/ForgotPassword" component={ForgotPassword} />
                        <ProtectedRoute exact path="/Home" component={PollBoard} />
                        <ProtectedRoute path="/Profile" component={UserComponent} />
                        
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routes;


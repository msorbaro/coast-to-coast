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

//Routes is essentially the central director of the website 
//It's like a working directory that also checks whether or not the user is authenticated 
//The default route is always the sign in component and everythign else moves from there 
class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            //this is the user object that is changed when the auth changes 
            user:{}, 
        };
    }
    //activates the authListener
    componentDidMount(){
        this.authListener();
    }
    //The auth listener basically waits to see if the user has logged on 
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
                        {/* "/" is the path that is rendered by default */}
                        <Route exact path="/" component={Signin} />
                        <Route path="/SignUp" component={SignUp} />
                        <Route path="/ForgotPassword" component={ForgotPassword} />
                        {/* "Protected routes are all accessible if and only if the user has signed in*/}
                        <ProtectedRoute exact path="/Home" component={PollBoard} />
                        <ProtectedRoute exact path="/Profile" component={UserComponent} />
                        
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routes;


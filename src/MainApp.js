import React, { Component } from 'react';
import fire from './config/Fire.js';
import PollBoard from './PollBoard';
import Signin from './Signin.js';

class MainApp extends Component{
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

    render(){
        return(
            <div>
                {/* if we have a user then render pollboard, else render signin */}
                {this.state.user ? (<PollBoard/>) : (<Signin/>)}
            </div>
        );
    }
}

export default MainApp;
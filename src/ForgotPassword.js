import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import fire from './config/Fire.js';
import {withRouter} from 'react-router-dom';

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {email: "", password: ""}

        //bind methods 
        this.inputEmail = this.inputEmail.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.pushHome = this.pushHome.bind(this);
    }
 
    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }

    forgotPassword = (e) => {
        fire.auth().sendPasswordResetEmail(this.state.email).catch((error) =>{
            console.log(error);
        }).then(() => {
            this.setState({status: "Successfully sent email. Returning to Sign in..."})
            setTimeout(this.pushHome, 3000);
        });
    }

    pushHome = () => {
        this.props.history.push("/")
    }

    render(){
        var emailBox = null;
        
        emailBox = (
            <div>
                <input value = {this.state.email} onChange ={this.inputEmail} />
            </div>
        )
        var userDisplay = (
                <div>
                    <h1> DartPoll</h1>
                    <p>Forget Your Password? Simply Change It</p>
                    {emailBox}
                    <button onClick = {this.forgotPassword}> Send Password Reset Email</button>
                    {this.state.status}
                </div>
            )
        return(
            <div>
                {userDisplay}
            </div>
        );
    }

}

export default ForgotPassword;
import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';

class Signin extends Component{
    constructor(props){
        super(props);
        //for now just four essential variables as well as mypolls (not sure how to incorporate that)
        this.state = {forgotpassword:false, newprofile: false, username: "", passwords: "", email: "", classyear: ""};
    }
    inputUsername = (event) => { 
        this.setState({username: event.target.value})
    }
    inputPassword = (event) => {
        this.setState({password: event.target.value})
    }
    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }
    createNewProfile = (event) => {
        this.setState({newprofile: true})
    }
    changeForgotPassword = (event) => {
        this.setState({forgotpassword:true})
    }

    render(){
        
        var usernameBox = null;
        var passwordBox = null;
        var emailBox = null;
        usernameBox= (
            <div>
                <input value = {this.state.username} onChange ={this.inputUsername} />
            </div>
        )
        passwordBox = (
            <div>
                <input value = {this.state.password} onChange ={this.inputPassword} />
            </div>
        )
        emailBox = (
            <div>
                <input value = {this.state.email} onChange ={this.inputEmail} />
            </div>
        )
        var userDisplay = (
            <div>
                <h1> DartPoll</h1>
                {usernameBox}
                {passwordBox}
                <button> Login</button>
                <p onClick = {this.changeForgotPassword}>Forgot password</p>
                <p onClick ={this.createNewProfile}>Create a new account</p>
            </div>
        );
        if(this.state.newprofile){
            userDisplay = (
                <div>
                    <h1> DartPoll</h1>
                    <p>Create a new account</p>
                    {usernameBox}
                    {passwordBox}
                    <button> Create</button>
                </div>
            )
        }
        if(this.state.forgotpassword){
            userDisplay = (
                <div>
                    <h1> DartPoll</h1>
                    <p>Enter in your email</p>
                    {emailBox}
                    <p> Enter in the new password you would like to use</p>
                    {passwordBox}
                    <button> Change Password</button>
                </div>
            )
        }
        return (
            <div>
                {userDisplay}
            </div>
        )
          
    }

}
export default Signin;
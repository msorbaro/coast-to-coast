import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import fire from './config/Fire.js';
import {withRouter} from 'react-router-dom';
import './PollBoard.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {email: "", password: "", status: ""}

        //bind methods 
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        

    }
    inputPassword = (event) => {
        this.setState({password: event.target.value})
    }
    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }

    signUp(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) =>{
            console.log(error);
        }).then(() => {
            this.setState({status: "Successfully created account"})
        });
        if(fire.auth().currentUser){
            this.props.history.push("/Home");
        }
    }

    render(){
        var passwordBox = null;
        var emailBox = null;
       
        passwordBox = (
            <div>
                <input className="username-password-box" placeholder="Password" type="password" value = {this.state.password} onChange ={this.inputPassword} />
            </div>
        )
        emailBox = (
            <div>
                <input className="username-password-box" placeholder="Email" value = {this.state.email} onChange ={this.inputEmail} />
            </div>
        )
        var userDisplay = (
                <div>
                    <h1 className="dartPollTitle"> DartPoll</h1>
                    <p className="createANewAccountText">Create a new account</p>
                    {emailBox}
                    <br></br>
                    {passwordBox}
                    <br></br>
                    <br></br>
                    <button className="createANewAccountButton" onClick = {this.signUp}> Create</button>
                    <br></br>
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

export default SignUp;
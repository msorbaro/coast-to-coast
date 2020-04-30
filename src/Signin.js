import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import fire from './config/Fire.js';
import {withRouter} from 'react-router-dom';
import './PollBoard.css';

class Signin extends Component{
    constructor(props){ 
        super(props);
        //binding all methods
        this.login = this.login.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.createNewProfile = this.createNewProfile.bind(this);
        this.changeForgotPassword = this.changeForgotPassword.bind(this);
        this.signUp = this.signUp.bind(this);

        //for now just four essential variables as well as mypolls (not sure how to incorporate that)
        this.state = {
            forgotpassword:false, 
            newprofile: false, 
            password: "", 
            email: "", 
        };
    }
    
    inputPassword = (event) => {
        this.setState({password: event.target.value})
    }
    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }
    createNewProfile = (event) => {
        // this.setState({newprofile: true})
        this.props.history.push("/SignUp");
    }
    changeForgotPassword = (event) => {
        // this.setState({forgotpassword:true})
        this.props.history.push("/ForgotPassword");
    }

    //auth based login function 
    login = (e) => {
        e.preventDefault();
        //authenticate the user with firebases methods
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        }).catch((error) =>{
            console.log(error);
        });
        if(fire.auth().currentUser){
            this.props.history.push("/Home");
        }
    }
    signUp = (e) =>{
        //sign the user up using firebase methods
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) =>{
            console.log(error);
        })
    }

    render(){
        var passwordBox = null;
        var emailBox = null;
       
        passwordBox = (
            <div>
                <input placeholder="Password" type="password" value = {this.state.password} onChange ={this.inputPassword}/>
            </div>
        )
        emailBox = (
            <div>
                <input placeholder="Email" value = {this.state.email} onChange ={this.inputEmail} />
            </div>
        )
        var userDisplay = (
            <div className="dartgreenBackground">
                <div>
                    <img src={require("./DartmouthLogo.png")}/>
                </div>
                <h1 className="dartPollTitle"> DartPoll</h1>
                {emailBox}
                <br></br>
                <div>
                    {passwordBox}
                    <p onClick = {this.changeForgotPassword} className="forgotPassword">
                        Forgot password?
                    </p>
                </div>
                <div>
                    <button onClick = {this.login} className="loginButton"> Login</button>
                </div>
                <br></br>
                <div>
                    <button onClick ={this.createNewProfile} className="createANewAccountButton">Create a new account</button>
                </div>
            </div>
        );

        return (
            <div>
                {userDisplay}
            </div>
        )
          
    }

}
export default Signin;
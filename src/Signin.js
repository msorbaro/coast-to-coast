import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import fire from './config/Fire.js';
import {withRouter} from 'react-router-dom';
// import history from './history';

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

        // this.handleChange = this.handleChange.bind(this);
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
        this.setState({newprofile: true})
    }
    changeForgotPassword = (event) => {
        this.setState({forgotpassword:true})
    }

    //auth based login function 
    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        }).catch((error) =>{
            console.log(error);
        });
        if(fire.auth().currentUser){
            this.props.history.push("/Home");
        }
    }
    signUp(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) =>{
            console.log(error);
        })
    }

    // handleChange(e){
    //     this.setState({ [e.target.name] : [e.target.value]});
    // }

    render(){
        
        var passwordBox = null;
        var emailBox = null;
       
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
                {emailBox}
                {passwordBox}
                <button onClick = {this.login}> Login</button>
                <p onClick = {this.changeForgotPassword}>Forgot password</p>
                <p onClick ={this.createNewProfile}>Create a new account</p>
            </div>
        );
        if(this.state.newprofile){
            userDisplay = (
                <div>
                    <h1> DartPoll</h1>
                    <p>Create a new account</p>
                    {emailBox}
                    {passwordBox}
                    <button onClick = {this.signUp}> Create</button>
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
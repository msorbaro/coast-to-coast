import React, { Component } from 'react';
import fire from './config/Fire';

class UserComponent extends Component{
    //this will essentially be the profile section
    constructor(props){
        super(props);
        this.state = {displayProfile: true, username: "", password: "", email: "", classyear: ""}
    }
    changeDisplay = () =>{
        this.setState({displayProfile: !this.state.displayProfile})
    }
    //methods that pull as the user information from the DB 
    //************ */

    //the profile section should essentially display either the indivials info, or their myPolls
    render(){
        var basicProfile = (
            <div>
                <h1>Profile</h1>
                <p>Email: {this.state.email}</p>
                <p>Username: {this.state.username}</p>
                <p>Password: {this.state.password}</p>
                <p>Class Year: {this.state.classyear}</p>
                <h1 onClick ={this.changeDisplay}>View My Polls</h1>
            </div>
        );
        var myPolls =(
            <div>
                <h1>My Polls</h1>
                <p onClick ={this.changeDisplay}>My Profile</p>
                {/* need some way of pulling all of the users previous polls form the db */}
            </div>
        );
        var displayedScreen = null;
        if(!this.state.displayProfile){
            displayedScreen = myPolls;
        }
        else{
            displayedScreen = basicProfile;
        }
        return(
            <div>
                {displayedScreen}
            </div>
        );
    }
}
export default UserComponent;
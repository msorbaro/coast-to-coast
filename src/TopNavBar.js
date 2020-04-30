import fire from './config/Fire';
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import history from './history';

 


class TopNavBar extends Component {
    constructor(props){
        super(props);
    }

    sendToProfile = () => {
        if(fire.auth().currentUser){
            this.props.history.push('/Profile');
        }
    }

    sendToHome = () => {
        if(fire.auth().currentUser){
            this.props.history.push('/Home');
        }
    }
    render(){
        return(
            <div>
                 <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link onClick = {this.sendToHome}>Home</Nav.Link>
                        <Nav.Link onClick = {this.sendToProfile}>Profile</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
    
}

export default TopNavBar;
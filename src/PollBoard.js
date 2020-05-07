import React, { Component, PureComponent } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import './App.css';
import fire from './config/Fire';
import * as db from './config/datastore';
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';

class PollBoard extends Component {
    constructor(props) {    
      super(props);
      //state vars 
      this.state = {
        polls: null, 
        pollID: 0, 
        newPollQuestion: "", 
        newPollChoices: "", 
        newPollCategory: "Default", 
        newPollTimeSeconds: "", 
        newPollTimeMinutes: "", 
        newPollTimeHours: "", 
        newPollTimeDays: "", 
        newPollUser: "", 
        StartTime: 0,
        EndTime: 0, 
        TimeLeft: []
    };

    //assign user auth to newPollUSer
    if(fire.auth().currentUser){
        var email = fire.auth().currentUser.email; 
        this.setState({newPollUser: email});
        console.log(this.state.newPollUser);
        console.log(fire.auth().currentUser);
    }

    //bind all methods 
    this.logout = this.logout.bind(this);   
    this.routeProfile = this.routeProfile.bind(this);
    this.fetchedPolls = this.fetchedPolls.bind(this);
    this.newPollQuestionFunction = this.newPollQuestionFunction.bind(this);
    this.newPollChoicesFunction = this.newPollChoicesFunction.bind(this);
    this.newPollCategoryFunction = this.newPollCategoryFunction.bind(this);
    this.savePollInfo = this.savePollInfo.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.newPollTimeSecondsFunction = this.newPollTimeSecondsFunction.bind(this);
    this.newPollTimeMinutesFunction = this.newPollTimeMinutesFunction.bind(this);
    this.newPollTimeHoursFunction = this.newPollTimeHoursFunction.bind(this);
    this.newPollTimeDaysFunction = this.newPollTimeDaysFunction.bind(this);
        
    }
    //I am adding a logout function here
    //apologies in advance if it messes something up
    componentDidMount(){
        db.fetchPolls(this.fetchedPolls);
    }
    logout = () => {
        fire.auth().signOut();
    }
    routeProfile = () => {
        this.props.history.push("/Profile");
    }

    fetchedPolls = (allPolls) => {
        this.setState({polls: allPolls})
    }
    
    newPollQuestionFunction = (event) => {
        this.setState({newPollQuestion: event.target.value})
    }

    newPollChoicesFunction = (event) => {
        this.setState({newPollChoices: event.target.value})
    }

    newPollCategoryFunction = (event) => {
        this.setState({newPollCategory: event.target.innerText})
    } 


    
    addPollFunction = (event) => {
        var x = document.getElementById("addPoll");
        if (x.style.display != "block") {
            x.style.display = "block";
        } 
    }

    collapsePollFunction = (event) => {
        var x = document.getElementById("addPoll");
        console.log("here");
        if (x.style.display != "none") {
            x.style.display = "none";
        } 
    }

    newPollTimeSecondsFunction = (event) => {
        this.setState({newPollTimeSeconds: parseInt(event.target.value)})
    }

    newPollTimeMinutesFunction = (event) => {
        this.setState({newPollTimeMinutes: parseInt(event.target.value)})
    }

    newPollTimeHoursFunction = (event) => {
        this.setState({newPollTimeHours: parseInt(event.target.value)})
    }

    newPollTimeDaysFunction = (event) => {
        this.setState({newPollTimeDays: parseInt(event.target.value)})
        this.setStartTime();
        this.setEndTime(this.StartTime);
        this.currentTimeLeft(this.EndTime)
    }

    setStartTime = () => {
        var startTimeNow = Date.now();
        this.setState({StartTime: startTimeNow})
    }

    setEndTime = (StartTime) => { 
        var endTime = StartTime + 1000 * this.state.newPollTimeSeconds + 60000 * this.state.newPollTimeMinutes + 60000 * 60 * this.state.newPollTimeHours + 60000 * 60 * 24 * this.state.newPollTimeDays; 
        this.setState({EndTime: endTime})
    }

    checkTime = (pollID, EndTime) => {
        if (Date.now() >= EndTime) {
            this.setState({polls: this.state.polls.delete(pollID)})
        }
    }

    currentTimeLeft = (StartTime, EndTime) => {
        var totalTimeLeft = EndTime - StartTime;
        var seconds = (totalTimeLeft / 1000) % 60;
        var minutes = (totalTimeLeft / (1000 * 60)) % 60;
        var hours = (totalTimeLeft / (1000 * 60 * 60)) % 24;
        var days = (totalTimeLeft / (1000 * 60 * 60 * 24)) % 30;
        var timeLeft = [seconds, minutes, hours, days];
        this.setState({TimeLeft: timeLeft})
    }

    savePollInfo = () => {
        db.addPoll(this.state.newPollQuestion,
            this.state.newPollChoices,
            this.state.newPollCategory,
            this.state.newPollTimeSeconds, 
            this.state.newPollTimeMinutes,
            this.state.newPollTimeHours,
            this.state.newPollTimeDays,
            this.state.newPollUser,
            this.state.EndTime,
            this.state.StartTime
        );
        this.setState({
            newPollQuestion: "", 
            newPollChoices: "", 
            newPollCategory: "", 
            newPollTimeSeconds: "", 
            newPollTimeMinutes: "", 
            newPollTimeHours: "", 
            newPollTimeDays: "", 
            newPollUser: "",
            EndTime: 0,
            StartTime: 0,
            TimeLeft: []
        });
        db.fetchPolls(this.fetchedPolls);
    }

    delete = (pollID) => {
        db.removePoll(pollID);
        db.fetchPolls(this.fetchedPolls);
    }

    save = (id, field) => {
        // db.updateName(id, field);
        // db.fetchPolls(this.fetchedPolls);
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
    render() {
      
        let allPolls = null;
        console.log(this.state.polls);
        if(this.state.polls != null){
                allPolls = Object.keys(this.state.polls).map((id) => {
                    const info = this.state.polls[id];
                    console.log(info);
                    return <PollComponent
                        save ={this.save}
                        delete ={this.delete}
                        PollQuestion={info.PollQuestion} 
                        PollChoices = {info.PollChoices}
                        PollCategory = {info.PollCategory} 
                        PollTimeLeft = {info.PollTimeLeft}
                        PollUser = {info.PollUser} 
                        id={id}
                    />
                }
            )
        }

        

        //display for the board and display for the pollcreation 
        var board = null;
        board =(
            <div>
                <div className="flex-container">
                    <div className="flex-child-topBar flex-container">
                        <div className="flex-child-Dartmouth">
                            <img src={require('./DartmouthLogo.png')} className="topLeftLogo"/>
                        </div>
                    </div>
                    <div className="flex-child-topBar">
                        <h1 className="dartPollTitle"> DartPoll</h1>
                        <input type="text" className="myInput center-block" onkeyup="myFunction()" placeholder="Filter Polls" title="Type in a name"/>
                    </div>
                    <div className="flex-child-topBar">
                        <div className="signedInAs">
                            <p className="signedInAsText">Signed in as</p>
                        </div>
                        <div className="flex-container">
                            <div className="flex-child-icons iconDivs">
                                <a onClick={this.sendToHome}>
                                    <img src={require('./home.png')} width="50" height="50"/>
                                    <p className="iconText">Home</p>
                                </a>
                            </div>
                            <div className="flex-child-icons iconDivs">
                                <a onClick={this.sendToProfile}>
                                    <img src={require('./profile.png')} width="50" height="50"/>
                                    <p className="iconText">Profile</p>
                                </a>
                            </div>
                            <div className="flex-child-icons iconDivs">
                                <a onClick={this.logout}>
                                    <img src={require('./logout.png')} width="50" height="50"/>
                                    <p className="iconText">Logout</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="flex-child">
                        <button onClick = {this.addPollFunction} className="createAPoll roundedButton">Create A Poll
                            <hr className="createAPollLine"></hr>
                            <div id="addPoll" className="hide">
                                <p>Enter Question</p>
                                <input placeholder= "Question?" type = "text" value={this.state.newPollQuestion} onChange={this.newPollQuestionFunction}/>

                                <p>Enter Answer Choices</p>
                                <input placeholder= "Answer Choices?" type = "text" value={this.state.newPollChoices} onChange={this.newPollChoicesFunction}/>

                                <p>Enter Poll Category</p>
                                <Dropdown as={ButtonGroup}>
                                <Button variant="success"> {this.state.newPollCategory} </Button>

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu style={{display: 'block'}}>
                                    <Dropdown.Item style={{display: 'block'}} onClick ={this.newPollCategoryFunction}>Action</Dropdown.Item>
                                    <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Another action</Dropdown.Item>
                                    <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Something else</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                                {/* just skipping some lines */}
                                                
                                <p>Enter Time Length</p>
                                <input placeholder="Seconds" type = "text" value={this.state.newPollTimeSeconds} onChange={this.newPollTimeSecondsFunction}/>
                                <br></br>
                                <input placeholder="Minutes" type = "text" value={this.state.newPollTimeMinutes} onChange={this.newPollTimeMinutesFunction}/>
                                <br></br>
                                <input placeholder="Hours" type = "text" value={this.state.newPollTimeHours} onChange={this.newPollTimeHoursFunction}/>
                                <br></br>
                                <input placeholder="Days" type = "text" value={this.state.newPollTimeDays} onChange={this.newPollTimeDaysFunction}/>

                                <div className = "post">
                                    <button onClick={this.savePollInfo}>Post Poll</button>
                                </div>
                                <br></br>
                                <button className="btn-hover color-1" onClick={this.collapsePollFunction}>Return to Board</button>
                            </div>
                        </button>
                    </div>
                    <div className="flex-child">
                        {allPolls}
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                {board}
            </div>
            
        )
    }
  }
  
export default PollBoard;
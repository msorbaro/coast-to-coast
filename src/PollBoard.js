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
import TopNavBar from './TopNavBar';
import Listofanswers from './Listofanswers';
import moment from 'moment';

class PollBoard extends Component {
    constructor(props) {    
      super(props);
      //state vars 
      this.state = {
        polls: null, 
        pollID: Math.floor(Math.random() * Math.floor(10000000000000)), 
        newPollQuestion: "", 
        newPollCategory: "Default", 
        newPollTimeSeconds: "", 
        newPollTimeMinutes: "", 
        newPollTimeHours: "", 
        newPollTimeDays: "", 
        newPollTimeMonths: "", 
        newPollTimeYears: "", 
        newPollUser: fire.auth().currentUser.email, 
        StartTime: 0, 
        TimeLeft: [],
        addpollbutton: false,
        answers: [],
    };


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
        
    }
    //I am adding a logout function here
    //apologies in advance if it messes something up

    componentDidMount(){
        db.fetchPolls(this.fetchedPolls);
        // ADDING TIME FUNCTIONALITY
        // this.interval = setInterval(() => {
        //     const { timeTillDate, timeFormat } = this.props;
        //     const then = moment(timeTillDate, timeFormat);
        //     const now = moment();
        //     const countdown = moment(then - now);
        //     const days = countdown.format('D');
        //     const hours = countdown.format('HH');
        //     const minutes = countdown.format('mm');
        //     const seconds = countdown.format('ss');

        //     this.setState({ days, hours, minutes, seconds });
        // }, 1000);
    }

    // componentWillUnmount() {
    //     if (this.interval) {
    //         clearInterval(this.interval);
    //     }
    // }

    logout = () => {
        fire.auth().signOut();
    }
    routeProfile = () => {
        this.props.history.push("/Profile");
    }

    routeHome = () => {
        this.props.history.push("/Home"); 
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
    addPollDisplayFunction = (event) => {
        this.setState({addpollbutton: !this.state.addpollbutton})
    }

    // newPollTimeLimitFunction = (event) => {
    //     this.setState({newPollTimeLimit: event.target.value})
    // }

    newPollTimeLimitFunctionSeconds = (event) => {
        this.setState({newPollTimeSeconds: parseInt(event.target.value)})
    }

    newPollTimeLimitFunctionMinutes = (event) => {
        this.setState({newPollTimeMinutes: parseInt(event.target.value)})
    }

    newPollTimeLimitFunctionHours = (event) => {
        this.setState({newPollTimeHours: parseInt(event.target.value)})
    }

    newPollTimeLimitFunctionDays = (event) => {
        this.setState({newPollTimeDays: parseInt(event.target.value)})
    }

    newPollTimeLimitFunctionMonths = (event) => {
        this.setState({newPollTimeMonths: parseInt(event.target.value)})
    }

    newPollTimeLimitFunctionYears = (event) => {
        this.setState({newPollTimeYears: parseInt(event.target.value)})
    }

    incrementPollID = () => {
        this.setState({pollID: Math.floor(Math.random() * Math.floor(10000000000000))});
    }
    //call back 
    updateAnswers = (answers) => {
        this.setState({answers: answers});
    }

    setStartTime = () => {
        var startTimeNow = Date.now();
        this.setState({StartTime: startTimeNow})
    }

    setEndTime = (PollTimeLimit, StartTime) => {   
        var EndTime = StartTime + 1000 * this.state.newPollTimeSeconds + 60000 * this.state.newPollTimeMinutes + 60000 * 60 * this.state.newPollTimeHours + 60000 * 60 * 24 * this.state.newPollTimeDays
        + 60000 * 60 * 24 * 30 * this.state.newPollTimeMonths + 60000 * 60 * 24 * 30 * 12 * this.state.newPollTimeYears; 
        this.setState({newEndTime: EndTime})
    }

    // checkTime = (pollID, EndTime) => {
    //     if (Date.now() >= EndTime) {
    //         this.setState({polls: this.state.polls.delete(pollID)})
    //     }
    // }

    // currentTimeLeft = (EndTime) => {
    //     var totalTimeLeft = EndTime - Date.now();
    //     var seconds = (totalTimeLeft / 1000) % 60;
    //     var minutes = (totalTimeLeft / (1000 * 60)) % 60;
    //     var hours = (totalTimeLeft / (1000 * 60 * 60)) % 24;
    //     var days = (totalTimeLeft / (1000 * 60 * 60 * 24)) % 30;
    //     var months = (totalTimeLeft / (1000 * 60 * 60 * 24 * 30)) % 12;
    //     var years = (totalTimeLeft / (1000 * 60 * 60 * 24 * 30 * 12));
    //     var timeLeft = [seconds, minutes, hours, days, months, years];
    //     this.setState({TimeLeft: timeLeft})
    // }

    // addPollFunction = (event) => {
    //     var x = document.getElementById("addPoll");
    //     var y = document.getElementById("poll-input");
    //     if (x.style.display != "block") {
    //         x.style.display = "block";
    //         y.style.backgroundColor = "#5b8c5a";
    //         y.style.color = "#cfd186";
    //     } 
    // }


    savePollInfo = () => {
        db.addPoll(this.state.newPollQuestion,
            this.state.answers,
            this.state.newPollCategory,
            this.state.newPollTimeSeconds, 
            this.state.newPollTimeMinutes,
            this.state.newPollTimeHours,
            this.state.newPollTimeDays,
            this.state.newPollTimeMonths,
            this.state.newPollTimeYears,
            this.state.newPollUser,
            this.state.StartTime,
            this.state.pollID
        );
        this.setState({
            newPollQuestion: "", 
            answers: [], 
            newPollCategory: "", 
            newPollTimeSeconds: "", 
            newPollTimeMinutes: "", 
            newPollTimeHours: "", 
            newPollTimeDays: "", 
            newPollTimeMonths: "", 
            newPollTimeYears: "", 
            newPollUser: ""
        });
        db.fetchPolls(this.fetchedPolls);
        this.incrementPollID();
        document.getElementById("addPoll").style.display = "none";
    }

    delete = (firebasepollID, localPollID) => {
        //also delte from polls
        db.removePoll(firebasepollID, localPollID);
        db.fetchPolls(this.fetchedPolls);
        


    }

    save = (id, field) => {
        // db.updateName(id, field);
        // db.fetchPolls(this.fetchedPolls);
    }

    updateVoteCount = (answer, ansnum, pollID) => {
        db.updateVoteCount(answer, ansnum, pollID);
    }

    updateUserVotedPolls = (pollID, useremail) => {
        db.updateUserVotedPolls(pollID, useremail);
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
                        updateVote = {this.updateVoteCount}
                        updateUVP = {this.updateUserVotedPolls}
                        PollQuestion={info.PollQuestion} 
                        PollChoices = {info.PollChoices}
                        PollCategory = {info.PollCategory} 
                        PollTimeLimit = {info.PollTimeLimit} 
                        PollUser = {info.PollUser} 
                        id = {id}
                        pollID={info.PollID}
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
                        <input type="text" className="myInput center-block" value={this.state.searchValue} onChange={event => this.handleOnChange(event)} placeholder="Filter Polls" title="Type in a name"/>
                    </div>
                    <div className="flex-child-topBar">
                        <div className="signedInAs">
                            <p className="signedInAsText">Signed in as: {fire.auth().currentUser.email}</p>
                        </div>
                        <div className="flex-container">
                            <div onClick={this.routeHome} className="flex-child-icons iconDivsAtHome">
                                <a onClick={this.routeHome}>
                                    <img src={require('./home.png')} width="50" height="50"/>
                                    <p className="iconText">Home</p>
                                </a>
                            </div>
                            <div onClick={this.routeProfile} className="flex-child-icons iconDivs">
                                <a onClick={this.routeProfile}>
                                    <img src={require('./profile.png')} width="50" height="50"/>
                                    <p className="iconText">Profile</p>
                                </a>
                            </div>
                            <div onClick={this.logout} className="flex-child-icons iconDivs">
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
                        <button onClick = {this.addPollFunction} id="poll-input" className="createAPoll roundedButton">Create A Poll
                            <hr className="createAPollLine"></hr>
                            <div id="addPoll" className="hide">
                                <p className="enter-question">Enter Question</p>
                                <input className="question-input-box" placeholder= "Question?" type = "text" value={this.state.newPollQuestion} onChange={this.newPollQuestionFunction}/>

                                <p className="enter-answer-choices">Enter Answer Choices</p>
                                <Listofanswers
                                update = {this.updateAnswers}
                                />
                                <br></br>
                                <p className="enter-category-text">Enter Category</p>
                                <Dropdown as={ButtonGroup}>
                                <Button className="category-button" variant="success"> {this.state.newPollCategory} </Button>
                                <br></br>
                                <br></br>
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="select-another-category-button">Select Another Category</Dropdown.Toggle>
                                <Dropdown.Menu style={{display: 'block'}}>
                                    <div className="other-categories-container showDiv">
                                        <div className="other-categories">
                                            <Dropdown.Item style={{display: 'block'}} onClick ={this.newPollCategoryFunction}>Academic</Dropdown.Item>
                                            <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Social</Dropdown.Item>
                                            <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Events</Dropdown.Item>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                                </Dropdown>
                                {/* just skipping some lines */}

                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                                
                                <p className="enter-time-length">Enter Time Length</p>
                                <input className="time-length-input-box" placeholder="Seconds" type = "text" value={this.state.newPollTimeSeconds} onChange={this.newPollTimeLimitFunctionSeconds}/>
                                <br></br>
                                <input className="time-length-input-box" placeholder="Minutes" type = "text" value={this.state.newPollTimeMinutes} onChange={this.newPollTimeLimitFunctionMinutes}/>
                                <br></br>
                                <input className="time-length-input-box" placeholder="Hours" type = "text" value={this.state.newPollTimeHours} onChange={this.newPollTimeLimitFunctionHours}/>
                                <br></br>
                                <input className="time-length-input-box" placeholder="Days" type = "text" value={this.state.newPollTimeDays} onChange={this.newPollTimeLimitFunctionDays}/>
                                <br></br>
                                <input className="time-length-input-box" placeholder="Months" type = "text" value={this.state.newPollTimeMonths} onChange={this.newPollTimeLimitFunctionMonths}/>
                                <br></br>
                                <input className="time-length-input-box" placeholder="Years" type = "text" value={this.state.newPollTimeYears} onChange={this.newPollTimeLimitFunctionYears}/>


                                {/* <div className = "post">
                                    <button onClick={this.savePollInfo}>Post Poll</button>
                                </div> */}
                                <br></br>
                                <button className="btn-hover color-1" onClick={this.savePollInfo}>Post!</button>
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
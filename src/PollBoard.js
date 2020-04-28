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
        newPollTimeMonths: "", 
        newPollTimeYears: "", 
        newPollUser: null, 
        StartTime: 0, 
        TimeLeft: [],
        addpollbutton: false
    };

    //assign user auth to newPollUSer
    if(fire.auth().currentUser){
        this.setState({newPollUser: fire.auth().currentUser});
    }

    //bind all methods 
    this.logout = this.logout.bind(this);   
    this.routeProfile = this.routeProfile.bind(this);
    this.fetchedPolls = this.fetchedPolls.bind(this);
    this.newPollQuestionFunction = this.newPollQuestionFunction.bind(this);
    this.newPollChoicesFunction = this.newPollChoicesFunction.bind(this);
    this.newPollCategoryFunction = this.newPollCategoryFunction.bind(this);
    // this.newPollTimeLimitFunction = this.newPollTimeLimitFunction.bind(this);
    this.savePollInfo = this.savePollInfo.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
        
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


    setStartTime = () => {
        // var seconds = date.getSeconds();
        // var minutes = date.getMinutes();
        // var hour = date.getHours();
        // var year = date.getFullYear();
        // var month = date.getMonth();
        // var day = date.getDate() ;
        // var startTimeNow = [seconds, minutes, hour, day, month, year];
        var startTimeNow = Date.now();
        this.setState({StartTime: startTimeNow})
    }

    setEndTime = (PollTimeLimit, StartTime) => {
        // var endSeconds = PollTimeLimit[0] + StartTime[0];
        // var addMinutes = 0;
        // while (endSeconds < 60) {
        //     endSeconds -= 60;
        //     addMinutes += 1;
        // }
        // var endMinutes = PollTimeLimit[1] + StartTime[1] + addMinutes;
        // var addHours = 0;
        // while (endMinutes < 60) {
        //     endMinutes -= 60;
        //     addHours += 1;
        // }
        // var endHours = PollTimeLimit[2] + StartTime[2] + addHours;
        // var addDays = 0;
        // while (endHours < 24) {
        //     endHours -= 24;
        //     addDays += 1;
        // }
        // var endDays = PollTimeLimit[3] + StartTime[3] + addDays;
        // var add = 0;
        // while (endMinutes < 60) {
        //     endMinutes -= 60;
        //     addHours += 1;
        // }        
        var EndTime = StartTime + 1000 * this.state.newPollTimeSeconds + 60000 * this.state.newPollTimeMinutes + 60000 * 60 * this.state.newPollTimeHours + 60000 * 60 * 24 * this.state.newPollTimeDays
        + 60000 * 60 * 24 * 30 * this.state.newPollTimeMonths + 60000 * 60 * 24 * 30 * 12 * this.state.newPollTimeYears; 
        this.setState({newEndTime: EndTime})
    }

    checkTime = (pollID, EndTime) => {
        if (Date.now() >= EndTime) {
            this.setState({polls: this.state.polls.delete(pollID)})
        }
    }

    currentTimeLeft = (EndTime) => {
        var totalTimeLeft = EndTime - Date.now();
        var seconds = (totalTimeLeft / 1000) % 60;
        var minutes = (totalTimeLeft / (1000 * 60)) % 60;
        var hours = (totalTimeLeft / (1000 * 60 * 60)) % 24;
        var days = (totalTimeLeft / (1000 * 60 * 60 * 24)) % 30;
        var months = (totalTimeLeft / (1000 * 60 * 60 * 24 * 30)) % 12;
        var years = (totalTimeLeft / (1000 * 60 * 60 * 24 * 30 * 12));
        var timeLeft = [seconds, minutes, hours, days, months, years];
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
            this.state.newPollTimeMonths,
            this.state.newPollTimeYears,
            this.state.newPollUser,
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
            newPollTimeMonths: "", 
            newPollTimeYears: "", 
            newPollUser: "", 
        });
        db.fetchPolls(this.fetchedPolls);
    }
    // savePokemonInfo = () => {
    //     db.addPokemon(this.state.newPokemonName, this.state.newPokemonType, this.state.newPokemonImage);
    //     //we can instead write
    //     this.setState({
    //         //showpokrmon var 
    //         newPokemonName: "",
    //         newPokemonType: "",
    //         newPokemonImage: "",
    //     })
    //     db.fetchPokemon(this.fetchedPokemon);
    // }

    // deletePokemon = (id) => {
    //     db.removePokemon(id);
    //     db.fetchPokemon(this.fetchedPokemon); 
    // }

    // savePokemon = (id, field) => {
    //     db.updateName(id, field);
    //     db.fetchPokemon(this.fetchedPokemon);
    // }

    delete = (pollID) => {
        db.removePoll(pollID);
        db.fetchPolls(this.fetchedPolls);
    }

    save = (id, field) => {
        // db.updateName(id, field);
        // db.fetchPolls(this.fetchedPolls);
    }

    render() {
        // const allPolls = this.state.polls.entrySeq().map(([id, poll]) => {
        //         console.log(poll)
        //         return <PollComponent save = {this.save} delete = {this.delete} PollQuestion={poll.PollQuestion} PollChoices = {poll.PollChoices} PollCategory = {poll.PollCategory} PollTimeLimit = {poll.PollTimeLimit} PollUser = {poll.PollUser} id={id}/>
        //     }
        // )
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
                        PollTimeLimit = {info.PollTimeLimit} 
                        PollUser = {info.PollUser} 
                        id={id}
                    />
                }
            )
        }

        //display for the board and display for the pollcreation 
        var board = null;
        var question = null;
        var display = null;
        board =(
            <div>
                <h1> This is the Poll Board </h1>
                <p onClick = {this.routeProfile}>Click here to visit my profile</p>
                <p onClick = {this.addPollDisplayFunction}> Add a Poll </p>
                <div>
                    {allPolls}
                </div>  
                <p onClick = {this.logout}> logout </p>
            </div>
        );
        question = (
            <div>
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
                <input placeholder="Seconds" type = "text" value={this.state.newPollTimeSeconds} onChange={this.newPollTimeLimitFunctionSeconds}/>
                <br></br>
                <input placeholder="Minutes" type = "text" value={this.state.newPollTimeMinutes} onChange={this.newPollTimeLimitFunctionMinutes}/>
                <br></br>
                <input placeholder="Hours" type = "text" value={this.state.newPollTimeHours} onChange={this.newPollTimeLimitFunctionHours}/>
                <br></br>
                <input placeholder="Days" type = "text" value={this.state.newPollTimeDays} onChange={this.newPollTimeLimitFunctionDays}/>
                <br></br>
                <input placeholder="Months" type = "text" value={this.state.newPollTimeMonths} onChange={this.newPollTimeLimitFunctionMonths}/>
                <br></br>
                <input placeholder="Years" type = "text" value={this.state.newPollTimeYears} onChange={this.newPollTimeLimitFunctionYears}/>


                <div className = "post">
                    <button onClick={this.savePollInfo}>Post Poll</button>
                </div>
                <p onClick = {this.addPollDisplayFunction}>Return to Board</p>
            </div>
            );
            if(this.state.addpollbutton){
                display = question;
            }
            else{
                display = board;
            }
        return (
            // <body>
            //   <div>  
            //           <p> This is the Poll Board </p>
            //           <p onClick = {this.routeProfile}>Click here to visit my profile</p>
            //           <p onClick = {this.addPollDisplayFunction}> Add a Poll </p>
                    
            //           <p>Enter Question</p>
            //           <input placeholder= "Question?" type = "text" value={this.state.newPollQuestion} onChange={this.newPollQuestionFunction}/>

            //           <p>Enter Answer Choices</p>
            //           <input placeholder= "Answer Choices?" type = "text" value={this.state.newPollChoices} onChange={this.newPollChoicesFunction}/>

            //           <p>Enter Poll Category</p>
            //           <Dropdown as={ButtonGroup}>
            //             <Button variant="success"> {this.state.newPollCategory} </Button>

            //             <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            //             <Dropdown.Menu style={{display: 'block'}}>
            //                 <Dropdown.Item style={{display: 'block'}} onClick ={this.newPollCategoryFunction}>Action</Dropdown.Item>
            //                 <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Another action</Dropdown.Item>
            //                 <Dropdown.Item style={{display: 'block'}} onClick = {this.newPollCategoryFunction}>Something else</Dropdown.Item>
            //             </Dropdown.Menu>
            //           </Dropdown>
            //           {/* just skipping some lines */}
                                         
            //           <p>Enter Time Length</p>
            //           <input placeholder="Seconds" type = "text" value={this.state.newPollTimeSeconds} onChange={this.newPollTimeLimitFunctionSeconds}/>
            //           <br></br>
            //           <input placeholder="Minutes" type = "text" value={this.state.newPollTimeMinutes} onChange={this.newPollTimeLimitFunctionMinutes}/>
            //           <br></br>
            //           <input placeholder="Hours" type = "text" value={this.state.newPollTimeHours} onChange={this.newPollTimeLimitFunctionHours}/>
            //           <br></br>
            //           <input placeholder="Days" type = "text" value={this.state.newPollTimeDays} onChange={this.newPollTimeLimitFunctionDays}/>
            //           <br></br>
            //           <input placeholder="Months" type = "text" value={this.state.newPollTimeMonths} onChange={this.newPollTimeLimitFunctionMonths}/>
            //           <br></br>
            //           <input placeholder="Years" type = "text" value={this.state.newPollTimeYears} onChange={this.newPollTimeLimitFunctionYears}/>


            //           <div className = "post">
            //              <button onClick={this.savePollInfo}>Post Poll</button>
            //           </div>
  
            //           <div>
            //             {allPolls}
            //           </div>  
            //           <p onClick = {this.logout}> logout </p>
            //   </div>
            // </body>
            <div>
                {display}
            </div>
            
        )
    }
  }
  
export default PollBoard;
import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import './App.css';
import fire from './config/Fire';
import { auth } from 'firebase';

class PollBoard extends Component {
    constructor(props) {
      super(props);
      this.state = {polls: Map(), pollID: 0, newPollQuestion: "", newPollChoices: "", newPollCategory: "", newPollTimeSeconds: "", 
      newPollTimeMinutes: "", newPollTimeHours: "", newPollTimeDays: "", newPollTimeMonths: "", newPollTimeYears: "", newPollUser: "", StartTime: 0, TimeLeft: []};
    }
    //I am adding a logout function here
    //apologies in advance if it messes something up
    logout = () => {
        fire.auth().signOut();
    }
    routeProfile = () => {
        this.props.history.push("/Profile");
    }
    fetchedPolls = (allPolls) => {
        this.setState({polls: allPolls}); 
    }
    
    newPollQuestionFunction = (event) => {
        this.setState({newPollQuestion: event.target.value})
    }

    newPollChoicesFunction = (event) => {
        this.setState({newPollChoices: event.target.value})
    }

    newPollCategoryFunction = (event) => {
        this.setState({newPollCategory: event.target.value})
    } 

    newPollTimeLimitFunction = (event) => {
        this.setState({newPollTimeLimit: event.target.value})
    }

    newPollTimeLimitFunctionSeconds = (event) => {
        this.setState({newPollTimeLimitSeconds: ParseInt(text, event.target.value)})
    }

    newPollTimeLimitFunctionMinutes = (event) => {
        this.setState({newPollTimeLimitMinutes: ParseInt(text, event.target.value)})
    }

    newPollTimeLimitFunctionHours = (event) => {
        this.setState({newPollTimeLimitHours: ParseInt(text, event.target.value)})
    }

    newPollTimeLimitFunctionDays = (event) => {
        this.setState({newPollTimeLimitDays: ParseInt(text, event.target.value)})
    }

    newPollTimeLimitFunctionMonths = (event) => {
        this.setState({newPollTimeLimitMonths: ParseInt(text, event.target.value)})
    }

    newPollTimeLimitFunctionYears = (event) => {
        this.setState({newPollTimeLimitYears: ParseInt(text, event.target.value)})
    }


    setStartTime = () => {
        // var seconds = date.getSeconds();
        // var minutes = date.getMinutes();
        // var hour = date.getHours();
        // var year = date.getFullYear();
        // var month = date.getMonth();
        // var day = date.getDate();
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


        
        var EndTime = StartTime + 1000 * newPollTimeSeconds + 60000 * newPollTimeMinutes + 60000 * 60 * newPollTimeHours + 60000 * 60 * 24 * newPollTimeDays
        + 60000 * 60 * 24 * 30 * newPollTimeMonths + 60000 * 60 * 24 * 30 * 12 * newPollTimeYears; 
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
        var pollData = {
            PollQuestion: this.state.newPollQuestion,
            PollChoices: this.state.newPollChoices, 
            PollCategory: this.state.newPollCategory, 
            PollTimeSeconds: this.state.newPollTimeSeconds, 
            PollTimeMinutes: this.state.newPollTimeMinutes,
            PollTimeHours: this.state.newPollTimeHours,
            PollTimeDays: this.state.newPollTimeDays,
            PollTimeMonths: this.state.newPollTimeMonths,
            PollTimeYears: this.state.newPollTimeYears,
            PollUser: this.state.newPollUser,
            StartTime: this.state.setStartTime
        }
        this.setState({
            polls: this.state.polls.set(this.state.ID, pollData),
            pollID: this.state.pollID +1,
        })
    }

    delete = (pollID) => {
        // db.removePoll(pollID);
        // db.fetchPolls(this.fetchedPolls);
    }

    save = (id, field) => {
        // db.updateName(id, field);
        // db.fetchPolls(this.fetchedPolls);
    }

    render() {
        const allPolls = this.state.polls.entrySeq().map(
            ([id, poll]) => {
                console.log(poll)
                return <PollComponent save = {this.save} delete = {this.delete} PollQuestion={poll.PollQuestion} PollChoices = {poll.PollChoices} PollCategory = {poll.PollCategory} PollTimeLimit = {poll.PollTimeLimit} PollUser = {poll.PollUser} id={id}/>
            }
        )
        return (
            <body>
              <div>
                        
                      <p> This is the Poll Board </p>
                      <p onClick = {this.routeProfile}>Click here to visit my profile</p>
                      <p> Add a Poll </p>
                    
                      <p>Enter Question</p>
                      <input placeholder= "Question?" type = "text" value={this.state.newPollQuestion} onChange={this.newPollQuestionFunction}/>

                      <p>Enter Answer Choices</p>
                      <input placeholder= "Answer Choices?" type = "text" value={this.state.newPollChoices} onChange={this.newPollChoicesFunction}/>

                      <p>Enter Poll Category</p>
                      <input placeholder= "Category?" type = "text" value={this.state.newPollCategory} onChange={this.newPollCategoryFunction}/>

                      <p>Enter User</p>
                      <input placeholder= "User?" type = "text" value={this.state.newPollUser} onChange={this.newPollUserFunction}/>
                      
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
  
                      <div>
                        {allPolls}
                      </div>  
                      <p onClick = {this.logout}> logout </p>
                  
              </div>
            </body>
        )
    }
  }
  
export default PollBoard;
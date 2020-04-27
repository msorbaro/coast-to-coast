import React, { Component } from 'react';
import { Map } from 'immutable';
import PollComponent from './PollComponent';
import './App.css';
import fire from './config/Fire';
import { auth } from 'firebase';

class PollBoard extends Component {
    constructor(props) {
      super(props);
      this.state = {polls: Map(), pollID: 0, newPollQuestion: "", newPollChoices: "", newPollCategory: "", newPollTimeLimit: "", newPollUser: ""};

        //bind all methods 
        this.logout = this.logout.bind(this);
        this.routeProfile = this.routeProfile.bind(this);
        this.fetchedPolls = this.fetchedPolls.bind(this);
        this.newPollQuestionFunction = this.newPollQuestionFunction.bind(this);
        this.newPollChoicesFunction = this.newPollChoicesFunction.bind(this);
        this.newPollCategoryFunction = this.newPollCategoryFunction.bind(this);
        this.newPollTimeLimitFunction = this.newPollTimeLimitFunction.bind(this);
        this.newPollUserFunction = this.newPollUserFunction.bind(this);
        this.savePollInfo = this.savePollInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);

        this.render = this.render.bind(this);

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

    newPollUserFunction = (event) => {
        this.setState({newPollUser: event.target.value})
    }

    savePollInfo = () => {
        var pollData = {
            PollQuestion: this.state.newPollQuestion,
            PollChoices: this.state.newPollChoices, 
            PollCategory: this.state.newPollCategory, 
            PollTimeLimit: this.state.newPollTimeLimit, 
            PollUser: this.state.newPollUser
        }
        this.setState({
            polls: this.state.polls.set(this.state.ID, pollData),
            pollID: this.state.pollID +1,
        })
    }

    delete = (pollID) => {
        this.setState({polls: this.state.polls.delete(pollID)})
    }

    save = (id, field) => {
        this.setState({polls:this.state.polls.update(id, (n) => { return Object.assign({}, n, field); })})
        console.log(field)
    }

    render() {
        const allPolls = this.state.polls.entrySeq().map(([id, poll]) => {
                console.log(poll)
                return <PollComponent save = {this.save} delete = {this.delete} PollQuestion={poll.PollQuestion} PollChoices = {poll.PollChoices} PollCategory = {poll.PollCategory} PollTimeLimit = {poll.PollTimeLimit} PollUser = {poll.PollUser} id={id}/>
            }
        )
        return (
            // <body>
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
                    
                      <p>Enter Time Limit</p>
                      <input placeholder= "Time Limit?" type = "text" value={this.state.newPollTimeLimit} onChange={this.newPollTimeLimitFunction}/>

                      <p>Enter User</p>
                      <input placeholder= "User?" type = "text" value={this.state.newPollUser} onChange={this.newPollUserFunction}/>
  
                      <div className = "post">
                         <button onClick={this.savePollInfo}>Post Poll</button>
                      </div>
  
                      <div>
                        {allPolls}
                      </div>  
                      <p onClick = {this.logout}> logout </p>
              </div>
            // </body>
        )
    }
  }
  
export default PollBoard;
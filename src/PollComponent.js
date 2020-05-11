import React, { Component } from 'react';
import firebase from 'firebase';
import fire from './config/Fire';

class PollComponent extends Component {
    
constructor(props) { 
    super(props);
    this.state = {editing: false, newPollCategory: "", pollID: this.props.pollID, currentAnswer: "", currentAnswerIdx: 0, click: false, stateVoteArray: null}; 
}

componentDidMount = () => {
    this.createVoteArray();
}
deletePosting = () => { 
    //im sending both the firebase pollID as well as the local pollID
    this.props.delete(this.props.id, this.state.pollID)
}

editPollCategory = () => { 
    this.setState({editing: true})
}

changeNewPollCategory = (event) => { 
    this.setState({newPollCategory: event.target.value})
}

submit = () => { 
    var newPollCategory = {
      PollCategory: this.state.newPollCategory
    }

    this.setState({editing: false})
    
    this.props.save(this.props.id, newPollCategory); 
}
updateVote = (choice, index) => {
    console.log("update vote");
    this.props.updateVote(choice, index, this.state.pollID);
    //update vote array
    this.createVoteArray();
    
}
createVoteArray = () => {
    let VoteArray = [];
    var pollsRef = firebase.database();
    let PollsDir = null;
    pollsRef.ref('Polls/').on('value', (snapshot) => {
        PollsDir = snapshot.val();
    });  
    let allPollsDir = null;

    if(PollsDir != null){
        allPollsDir = Object.keys(PollsDir).map((id) => {
            //looking at poll id level 
            const info = PollsDir[id];
            console.log("value of id" + id);
            console.log("inside object map")
            console.log(info);
            //make sure we are retireving the correct poll
            console.log("the id of the poll" + info.PollID);
            if(this.state.pollID == info.PollID){
                Object.keys(PollsDir[id]).map((id2) => {
                        const sinfo = PollsDir[id][id2];
                        console.log("inside  answers and votes- Poll Component");
                        console.log(sinfo);
                        let ansval = PollsDir[id][id2].score;
                        if(ansval != undefined){
                            VoteArray.push(ansval);
                        }
                    
                });
            }
        });
    }
    this.setState({stateVoteArray: VoteArray});
    console.log(VoteArray);
    // console.log("Vote Array: " + this.state.stateVoteArray);
    console.log(this.props.PollChoices);
}

render() {
    var editBoxOrEditButton = null; 
    if(this.state.editing){
      editBoxOrEditButton= (
        <div>
            <input value = {this.state.newPollCategory} onChange = {this.changeNewPollCategory}/>
            <button onClick = {this.submit}> Submit </button>
        </div>
      )
    }
    else {
      editBoxOrEditButton = <button className="edit-poll-category-button" onClick = {this.editPollCategory}>Edit Poll Category</button>
    }

    var dispchoices = null;
    var vote = null;
    if(this.state.stateVoteArray == null){
        vote = this.props.PollChoices;
    }
    else{
        vote = this.state.stateVoteArray;
    }
    console.log("vote:" + vote);
    if(this.props.PollChoices != null){

        dispchoices  = this.props.PollChoices.map((choice, index) => (
            //change to span to eliminate error
            //if the choice is clicked, we need to increment the count or number of votes of the choice...
            //{vote[Number(index)]}
        <button onClick = {() => this.updateVote(choice, index)}> {choice}:{vote[Number(index)]}</button>
        )
        );
    }

    return (
        <div className="polls">
            <div className="poll-title-container">
                <p className="pollTitle"> {this.props.PollQuestion}?</p>
            </div>
            <div className="flex-container-polls">
                <div className="flex-child-polls1">
                    <div className="respondents">
                        <p className="respondentsText">54 respondents</p>
                    </div>
                </div>
                <div className="flex-child-polls1">
                    <div className="category-div">
                        <p className="category-text">Category: {this.props.PollCategory}</p>
                    </div>
                </div>
            </div>
            {/* <p id="dispchoice">{this.formatChoices(dispchoices)}</p> */}
            <p> {dispchoices} </p> 
            <p>{this.props.PollTimeLimit}, {this.props.PollUser}</p>
            <div className="flex-container-poll-edit-or-delete">
                <div className="flex-child-poll-delete">
                    <button className="delete-poll-button" onClick= {this.deletePosting}>Delete</button>
                </div>
                <div className="flex-child-poll-edit">
                    {editBoxOrEditButton}  
                </div>
            </div>
        </div>
    )
    }   
}

export default PollComponent;
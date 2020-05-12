import React, { Component } from 'react';
import firebase from 'firebase';
import fire from './config/Fire';
import {Pie, Doughnut} from 'react-chartjs-2';
import Countdown from './Countdown'; 

class PollComponent extends Component {
    
constructor(props) { 
    super(props);
    this.state = {editing: false, newPollCategory: "", pollID: this.props.pollID, currentAnswer: "", currentAnswerIdx: 0, click: false, stateVoteArray: null, sumVotes: 0, deleteStatus: ""}; 
}

componentDidMount = () => {
    this.createVoteArray();
}
deletePosting = () => { 
    //I essentially want to check if the user deleting the poll is the same as the user who posted it 
    let ourDB = firebase.database();
    let PollDir = null;
    ourDB.ref('PollBoard/').on('value', (snapshot) => {
        PollDir = snapshot.val();
    });
    
   if(PollDir != null){
        Object.keys(PollDir).map((id1) => {
            const info = PollDir[id1];
            //check if we have indexed into the right poll, and check then if this poll has the same user
            if((info.PollID == this.state.pollID) && (fire.auth().currentUser.email == info.PollUser)){
                //if this is true, we can allow delete
                //im sending both the firebase pollID as well as the local pollID
                this.props.delete(this.props.id, this.state.pollID)
            }
            else{
                this.setState({deleteStatus: "Only the poll author can remove this poll."})
            }
        });
   }
    
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
    //check if user is eligible to update the vote 
    let useremail = fire.auth().currentUser.email;

    if(!this.checkSingleVote(this.state.pollID, useremail)){

        console.log("update vote");
        this.props.updateVote(choice, index, this.state.pollID);
        //update vote array
        this.createVoteArray();
        //update the user list of voted polls
        this.props.updateUVP(this.state.pollID, useremail);
    }
    
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
    let sum = 0;
    for(let i = 0; i < VoteArray.length; i ++){
        sum += VoteArray[i];
    }
    this.setState({sumVotes: sum});
}

//function that checks if user is allowed to vote
checkSingleVote = (pollID, useremail) => {
    let retreivedSet = new Set();
    let ourDB = firebase.database();
    let PollDir = null;
    ourDB.ref('VotedPolls/').on('value', (snapshot) => {
        PollDir = snapshot.val();
    });
    
   if(PollDir != null){
        Object.keys(PollDir).map((id1) => {
            const info = PollDir[id1];
            if(info.useremail == useremail){
                Object.keys(info).map((id2) => {
                    const val = info[id2];
                    if(val != useremail){
                        retreivedSet.add(val);
                    }
                });
            }
        });
   }
   return retreivedSet.has(pollID);
}
//pie plot functions
dataFunc = (labelInputs, dataInputs) => {
    const data = {labels: labelInputs, 
                datasets: [{backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4'], 
                data: dataInputs}]}
    return(data)
}

optionsFunc = (titleInput) => {
    const options = {title:{display:true, text: titleInput, fontSize: 30, fontColor: '#FFFFFF'}, maintainAspectRatio: false, responsive: false,
        legend: {display:true, position:'right', boxWidth: 1, labels:{fontSize: 15, fontColor: '#FFFFFF'}}
    }
    return(options)
}


render() {
    //we essentially want to display the pie chart if the user has previously voted on this poll
    let piedisp = null;
    if(this.checkSingleVote(this.state.pollID, fire.auth().currentUser.email)){
        piedisp = <Pie data={this.dataFunc(this.props.PollChoices, this.state.stateVoteArray)} className="pie-chart-on-poll" options={this.optionsFunc("")}/>
    }

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
        <button className="answer-choices" onClick = {() => this.updateVote(choice, index)}> {choice}:{vote[Number(index)]}</button>
        )
        );
    }
    //s
    return (
        <div className="polls">
            <div className="poll-title-container">
                <p className="pollTitle"> {this.props.PollQuestion}?</p>
            </div>
            <div className="flex-container-polls">
                <div className="flex-child-polls1">
                    <div className="respondents">
                        <p className="respondentsText">{this.state.sumVotes} respondents</p>
                    </div>
                </div>
                <div className = "flex-child-polls1">
                    <Countdown timeTillDate="05 28 2019, 6:00 am" timeFormat="MM DD YYYY, h:mm a" />
                </div>
                <div className="flex-child-polls1">
                    <div className="category-div">
                        <p className="category-text">Category: {this.props.PollCategory}</p>
                    </div>
                </div>
            </div>
            {/* <p id="dispchoice">{this.formatChoices(dispchoices)}</p> */}
            {/* <p> {dispchoices} </p>  */}
            {dispchoices.map((value, index) => {
                return <div className="answer-choices-div" key={index}>{value}</div>
            })}
            <div>
                <div className="constrain-pie">
                    {piedisp}
                </div>
            </div>
            <p>{this.props.PollTimeLimit}</p>
            <h2 className="poll-author">Poll Author: {this.props.PollUser}</h2>
            <div className="flex-container-poll-edit-or-delete">
                <div className="flex-child-poll-delete">
                    <button className="delete-poll-button" onClick= {this.deletePosting}>Delete</button>
                    <p>{this.state.deleteStatus}</p>
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
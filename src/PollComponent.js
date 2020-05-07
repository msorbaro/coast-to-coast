import React, { Component } from 'react';
import './App.css';

class PollComponent extends Component {
    constructor(props) { 
    super(props); 
    this.state = {editing: false, newPollCategory: ""}; 
}
  
deletePosting = () => { 
    this.props.delete(this.props.id)
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
      editBoxOrEditButton = <button onClick = {this.editPollCategory}>Edit Poll Category</button>
    }

    return (
        <div className="polls">
            <div>
                <p className="pollTitle"> {this.props.PollQuestion}?</p>
            </div>
            <div className="flex-containee-polls">
                <div className="flex-child-polls1">
                    <div className="respondents">
                        <p className="respondentsText">54 respondents</p>
                    </div>
                </div>

            </div>
            <p>{this.props.PollChoices}</p>
            
            <p>{this.props.PollCategory}, {this.props.PollTimeLeft}, {this.props.PollUser}</p>
            <button onClick= {this.deletePosting}>Delete</button>
            {editBoxOrEditButton}
        </div>
    )
    }   
}

export default PollComponent;
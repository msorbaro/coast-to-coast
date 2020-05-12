import React, { Component} from 'react';
// import Fragment from 'react';

//credit to stack overflow user Josh Pittman for this solution
//https://stackoverflow.com/questions/36512686/react-dynamically-add-input-fields-to-form


class Listofanswers extends Component {
    constructor(props){
        super(props);
        this.state = {questions: [""]}   
    }

    handleText = i => e => {
      let questions = [...this.state.questions]
      questions[i] = e.target.value
      this.setState({questions: questions})
      //update in pollboard
      this.props.update(this.state.questions);
      // console.log("inside list answers")
      // console.log(questions[i]);
      // console.log(e.target.value);
    }
  
    handleDelete = i => e => {
      e.preventDefault()
      let questions = [
        ...this.state.questions.slice(0, i),
        ...this.state.questions.slice(i + 1)
      ]
      this.setState({questions: questions})
      //update in pollboard
      this.props.update(this.state.questions);
    }
  
    addQuestion = e => {
      e.preventDefault()
      let questions = this.state.questions.concat([''])
      this.setState({questions: questions})
      //update in pollboard
      this.props.update(this.state.questions);
    }
  
    render() {
      return (
        <React.Fragment>
          {this.state.questions.map((question, index) => (
            <span key={index}>
              <input
                className="answer-choices-input-bar"
                type="text"
                placeholder="Answer Choice"
                onChange={this.handleText(index)}
                value={question}
              />
              <button className="delete-answer-choice-button" onClick={this.handleDelete(index)}>Delete</button>
              <br></br>
            </span>
          ))}
          <br></br>
          <button className="add-answer-choice-button" onClick={this.addQuestion}>Add Answer Choices</button>
        </React.Fragment>
      )
    }
  }
  
  export default Listofanswers;
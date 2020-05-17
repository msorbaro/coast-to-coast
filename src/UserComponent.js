import React, { Component, PureComponent } from 'react';
import fire from './config/Fire';
import firebase from 'firebase';
import TopNavBar from './TopNavBar'
import './App.css';
import './PollBoard.css';
import {Pie, Doughnut} from 'react-chartjs-2';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';

class UserComponent extends Component{
    //this will essentially be the profile section
    constructor(props){
        super(props);
        this.state = {displayProfile: true, username: "", password: "", email: "", classyear: "", dataArray: [], pollQuestionArray: []}
    }

    componentDidMount = () =>{
        this.transferData();
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

    logout = () => {
        fire.auth().signOut();
    }

    changeDisplay = () =>{
        this.setState({displayProfile: !this.state.displayProfile})
    }

    dataFunc = (labelInputs, dataInputs) => {
        const data = {labels: labelInputs, 
                    datasets: [{backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4'], 
                    data: dataInputs}]}
        return(data)
    }

    optionsFunc = (titleInput) => {
        const options = {title:{display:true, text: titleInput, fontSize: 30, fontColor: '#FFFFFF'},
            legend: {display:true, position:'right', labels:{fontSize: 15, fontColor: '#FFFFFF'}}
        }
        return(options)
    }

    pieFunc = (labelInputs, dataInputs, titleInput) => {
        const pie = <Pie data={this.dataFunc(labelInputs, dataInputs)} options={this.optionsFunc(titleInput)}/>
        return(pie)
    }
    
    //this where I want to find all of the user posted polls and retrieve their data 
    transferData = () => {
        let db = firebase.database();
        //first find out the poll IDs of all the polls the user has created
        let pollIDset = new Set();
        let PollDir = null;
        db.ref('PollBoard/').on('value', (snapshot) => {
            PollDir = snapshot.val();
        });
        console.log("PollDIr");
        console.log(PollDir);
        let pollNameArray = [];
        if(PollDir != null){
            Object.keys(PollDir).map((id1) => {
                const info = PollDir[id1];
                //check if the user who created the poll matches the current user logged in
                console.log("the info");
                console.log(info);
                if(info.PollUser == fire.auth().currentUser.email){
                    //add the pollID
                    pollIDset.add(info.PollID);
                    //add the name/question of the poll
                    pollNameArray.push(info.PollQuestion);
                }
            });
       }
       console.log("the set");
       console.log(pollIDset);
       console.log(pollNameArray);
       //find the specific polls from polls
       db.ref('Polls/').on('value', (snapshot) => {
            PollDir = snapshot.val();
        });

        //now find the data of all the polls the user has created
       let dataArray  = []; 
       if(PollDir != null){
        Object.keys(PollDir).map((id) => {
            //looking at poll id level 
            const info = PollDir[id];
            //making sure the user has the pollID we care about
            if(pollIDset.has(info.PollID)){
                let labelInputs = [];
                let dataInputs = [];
                Object.keys(PollDir[id]).map((id2) => {
                    labelInputs.push(PollDir[id][id2].choice);
                    dataInputs.push(PollDir[id][id2].score);
                });
                //trim off the undefined end 
                labelInputs.pop();
                dataInputs.pop();
                let labeldata = [labelInputs, dataInputs];
                dataArray.push(labeldata);
            }
        });
       }   
    console.log(dataArray);
    this.setState({dataArray: dataArray})
    this.setState({pollQuestionArray: pollNameArray});
    //now turn it into a display
    let displayedCharts = null;


    displayedCharts  = dataArray.map((choice, index) => (
        <Pie data={this.dataFunc(dataArray[index][0], dataArray[index][1])} options={this.optionsFunc(pollNameArray[index])}/>
    ));
    }

    // takes in answer choices and data and spits out a corresponding data set we will use for our data visualization
    dataFunc = (labelInputs, dataInputs) => {
        const data = {labels: labelInputs, 
                    datasets: [{backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4'], 
                    data: dataInputs}]}
        return(data)
    }

    // takes in a title and creates and options set that we will use for our data visualization 
    optionsFunc = (titleInput) => {
        const options = {title:{display:true, text: titleInput, fontSize: 30, fontColor: '#FFFFFF'},
            legend: {display:true, position:'right', labels:{fontSize: 15, fontColor: '#FFFFFF'}}
        }
        return(options)
    }
    

    //the profile section should essentially display either the indivials info, or their myPolls
    render(){
        var myPolls =(
            <div>
                <button onClick ={this.changeDisplay} className = "toggleButtons">Back to Profile</button>
                <h1>My Polls</h1>
                {/* need some way of pulling all of the users previous polls from the db-- can mostly likely do this with associated 
                user tag on each poll */}
            </div>
        );

        var displayedScreen = null;       
        if(this.state.displayProfile == false){
                displayedScreen = myPolls;
        }

        // Colors that can accomodate for up to 10 answer choices 
        const Colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4']; 


        //create the pie display 
        let displayedCharts = null;
        displayedCharts  = this.state.dataArray.map((choice, index) => (
            <Pie data={this.dataFunc(this.state.dataArray[index][0], this.state.dataArray[index][1])} options={this.optionsFunc(this.state.pollQuestionArray[index])}/>
        ));

        return(
            <div>
                {displayedScreen}
                <div className="flex-container-profile">
                    <div className="flex-child-topBar flex-container">
                        <div className="flex-child-Dartmouth">
                            <img src={require('./DartmouthLogo.png')} className="topLeftLogo"/>
                        </div>
                    </div>
                    <div className="flex-child-topBar">
                        <h1 className="dartPollTitle"> DartPoll</h1>
                    </div>
                    <div className="flex-child-topBar">
                        <div className="signedInAs">
                            <p className="signedInAsText">Signed in as: {fire.auth().currentUser.email}</p>
                        </div>
                        <div className="flex-container">
                            <div id="homeIconDiv" onClick={this.sendToHome} className="flex-child-icons iconDivs">
                                <a id="homeIcon" onClick={this.sendToHome}>
                                    <img src={require('./home.png')} width="50" height="50"/>
                                    <p className="iconText">Home</p>
                                </a>
                            </div>
                            <div onClick={this.sendToProfile} className="flex-child-icons iconDivsAtProfile">
                                <a onClick={this.sendToProfile}>
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
                <div className="userInfo">
                    <div className="userInfoBox">
                        <div className="your-info-box">
                            <h1 className="your-info">My Profile</h1>
                        </div>
                        <div className="flex-container">
                            <div className="flex-child-profile">
                                <div>
                                    <hr className="userInfoLineLeftTop"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">Email:</p>
                                    </div>
                                    <hr className="userInfoLineLeft"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">Password:</p>
                                    </div>
                                    <hr className="userInfoLineLeft"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">Other Stuff:</p>
                                    </div>
                                    <hr className="userInfoLineLeft"></hr>
                                </div>
                            </div>
                            <div className="flex-child-profile">
                                <div>
                                    <hr className="userInfoLineRightTop"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">{fire.auth().currentUser.email}</p>
                                    </div>
                                    <hr className="userInfoLineRight"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">hello123</p>
                                    </div>
                                    <hr className="userInfoLineRight"></hr>
                                    <div className="top-info">
                                        <p className="userInfoText">Corresponding info</p>
                                    </div>
                                    <hr className="userInfoLineRight"></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style={{display: 'flex', justifyContent:'center', flexWrap: 'wrap', height: '100vh'}}> */}
                {/* </div> */}
                <div className="polls-in-profile-container">
                    <div className="polls-in-profile-box">
                        <div className="my-polls-box">
                            <h1 className="my-polls">My Polls</h1>
                        </div>
                        {displayedCharts.map((value, index) => {
                            return <div className="polls-in-profile" key={index}>{value}</div>
                        })}
                    </div>
                </div>
            {/* Pass in Labels and Pass in Voting Numbers into Data Func; Pass in Title into Options Func  */}
            {/* <Pie data={this.dataFunc(['Hop', 'Collis', 'KAF','Foco', 'Novak'], [140, 33, 27, 21, 6])} options={this.optionsFunc('Best Place to Eat on Campus')}/> */}

                {/* <div className = "pollBackground">
                        <h1> Question 1: Who is the best professor at Dartmouth? </h1>
                        <div style={{ justifyContent: 'center'}}> 
                        <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={200} label = {renderCustomizedLabel}>
                        {data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label/>)}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                        </div>

                        <h1> Question 2: When do you think we will return to campus? </h1>
                        <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={false} data={data02} cx={200} cy={200} outerRadius={200}>
                        {data02.map((entry, index) => <Cell key={`cell-${"hello"}`} fill={COLORS[index % COLORS.length]} label = {renderCustomizedLabel}/>)}
                        </Pie>
                        <Tooltip />
                        </PieChart>

                        <h1> We aren't using this chart anymore </h1>
                        <PieChart width={500} height={500}>
                        <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel}  outerRadius={200} fill="#8884d8" dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        </PieChart>
                </div> */}
            </div>
        );
    }
}
export default UserComponent;
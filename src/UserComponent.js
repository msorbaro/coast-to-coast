import React, { Component, PureComponent } from 'react';
import {PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';
import fire from './config/Fire';

class UserComponent extends Component{
    //this will essentially be the profile section
    constructor(props){
        super(props);
        this.state = {displayProfile: true, username: "", password: "", email: "", classyear: ""}
    }
    changeDisplay = () =>{
        this.setState({displayProfile: !this.state.displayProfile})
    }
    //methods that pull as the user information from the DB 
    //************ */

    //the profile section should essentially display either the indivials info, or their myPolls
    render(){
        var basicProfile = (
            <div>
                <h1>Profile</h1>
                <p>Email: {this.state.email}</p>
                <p>Username: {this.state.username}</p>
                <p>Password: {this.state.password}</p>
                <p>Class Year: {this.state.classyear}</p>
                <h1 onClick ={this.changeDisplay}>View My Polls</h1>
            </div>
        );
        var myPolls =(
            <div>
                <h1>My Polls</h1>
                <p onClick ={this.changeDisplay}>My Profile</p>
                {/* need some way of pulling all of the users previous polls from the db-- can mostly likely do this with associated 
                user tag on each poll */}
            </div>
        );
        var displayedScreen = null;
        if(!this.state.displayProfile){
            displayedScreen = myPolls;
        }
        else{
            displayedScreen = basicProfile;
        }
        const data = [
            { name: 'Group A', value: 200},
            { name: 'Group B', value: 800 },
            { name: 'Group C', value: 400 },
            { name: 'Group D', value: 200 },
            {name: 'Group E', value: 100}
          ];

          const data01 = [
            { name: 'Prof. Chakrabarty', value: 1000},
            { name: 'Prof. Chakrabarti', value: 400 },
            { name: 'Prof. Pierson', value: 600 },
            { name: 'Prof. Cormen', value: 750}, 
            { name: 'Prof. Jayanti', value: 900}
          ];

          const data02 = [
            { time: '20F', value: 1000},
            { time: '21W', value: 500 },
            { time: 'After 21W', value: 200 }
          ];

        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8"]; 
        // Many Possible Colors for our chart-- chart.js will only use the first n we have, where n = number of answer choices we have 

        const RADIAN = Math.PI / 180;

        const renderCustomizedLabel = ({ // Determines styles of chart -- DONT TOUCH (unless you know how to navigate this)
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              {`${(percent * 100).toFixed(0)}%`}
            </text>
          );
        };

        return(
            <div>
                {displayedScreen}
                <div style={{display: 'flex', justifyContent:'center', flexWrap: 'wrap', height: '100vh'}}>

                    <h1> Question 1: Who is the best professor at Dartmouth? </h1>
                    <PieChart width={500} height={500}>
                   <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={200} label = {renderCustomizedLabel}>
                    {data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    </PieChart>

                    <h1> Question 2: When do you think we will return to campus? </h1>
                    <PieChart width={500} height={500}>
                   <Pie dataKey="value" isAnimationActive={false} data={data02} cx={200} cy={200} outerRadius={200} label = {renderCustomizedLabel}>
                    {data02.map((entry, index) => <Cell key={`cell-${entry.time}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                    
                    <h1> We aren't using this chart anymore </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel}  outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>
                </div>
            </div>
        );
    }
}
export default UserComponent;
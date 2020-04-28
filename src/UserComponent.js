import React, { Component, PureComponent } from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';
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
            { name: 'Group A', value: 700},
            { name: 'Group B', value: 100 },
            { name: 'Group C', value: 350 },
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
                <div style={{display: 'flex', justifyContent:'center', flewFlow: 'row wrap', height: '100vh'}}>
                    
                    <h1> Question 1: How are you doing today? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 2: Why? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data01} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 3: When's the latest you think we will return to campus? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data01} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 4: When's the earliest you think we will return to campus? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data01} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 5: Who is the best professor at Dartmouth? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 5: Who is the best professor at Dartmouth? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>

                    <h1> Question 5: Who is the best professor at Dartmouth? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>
                    
                    <h1> Question 5: Who is the best professor at Dartmouth? </h1>
                    <PieChart width={500} height={500}>
                    <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={200} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    </PieChart>
                </div>
            </div>
        );
    }
}
export default UserComponent;
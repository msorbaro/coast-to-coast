import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";


import history from './history';
import Signin from "./Signin";
import PollBoard from "./PollBoard";
import UserComponent from "./UserComponent";

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/Home" component={PollBoard} />
                    <Route path="/Profile" component={UserComponent} />
                    {/* <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}

export default Routes;


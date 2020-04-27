import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import fire from './config/Fire';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {
            (props) => {
                if(fire.auth().currentUser){
                    return <Component {...props}/>;
                }
                else{
                    return( <Redirect to = {{
                            pathname: "/",
                            state: {
                            from: props.location
                            }
                            }}
                        />
                    );

                } 
            }}
        />
    );
}
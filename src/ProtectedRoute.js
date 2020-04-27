import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import fire from './config/Fire';

//protected route is the routing tool that ensures that the user is authorized to view the component, 
//else they will be stuck at the sign in screen
export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        //This is where a route is determined but only if user exists will the route route to the original component
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
import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../dashboard/Login';
import ProtectedRoute from "./protectedRoute";
import Dashboard from "../dashboard/Dashboard";
import ClubPlayers from '../dashboard/ClubPlayers';
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';


export default class RoutesSuperAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact>
                            <Login usertype="/user" />
                        </Route>
                        <Route path="/login" exact>
                            <Login usertype="/user" />
                        </Route>
                        <ProtectedRoute usertype="/user" exact path="/dashboard" component={Dashboard}></ProtectedRoute>
                        {/* <Route path="/dashboard" component={Dashboard}></Route> */}

                    </Switch>
                </HashRouter>
            </React.Fragment>
        )
    }
}
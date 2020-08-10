import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../dashboard/Login';
import ProtectedRoute from "./protectedRoute";
import Dashboard from "../dashboard/Dashboard";
import ClubPlayers from '../dashboard/ClubPlayers';

export default class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact>
                            <Login />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
                        <ProtectedRoute exact path="/club-players" component={ClubPlayers}></ProtectedRoute>
                        {/* <Route path="/dashboard" component={Dashboard}></Route> */}
                        <Route path="*">
              <Redirect to="/login" />
            </Route>
                    </Switch>
                </HashRouter>
            </React.Fragment>
        )
    }
}
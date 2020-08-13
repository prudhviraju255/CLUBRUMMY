import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../dashboard/Login';
import ProtectedRoute from "./protectedRoute";
import Dashboard from "../dashboard/Dashboard";
import ClubPlayers from '../dashboard/ClubPlayers';
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';


export default class RoutesAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Switch>

                        <Route path="/admin/login" exact>
                            <Login usertype="/admin" />
                        </Route>
                        <ProtectedRoute usertype="/admin" exact path="/admin/dashboard" component={Dashboard}></ProtectedRoute>
                        <ProtectedRoute usertype="/admin" exact path="/admin/club-players" component={UserRegistration}></ProtectedRoute>
                        <ProtectedRoute usertype="/admin" exact path="/admin/cash-games/point-rummy" component={CG_PointRummy}></ProtectedRoute>
                        {/* <Route path="/dashboard" component={Dashboard}></Route> */}
                        <Route path="*">
                            <Redirect to="/admin/login" />
                        </Route>
                    </Switch>
                </HashRouter>
            </React.Fragment>
        )
    }
}
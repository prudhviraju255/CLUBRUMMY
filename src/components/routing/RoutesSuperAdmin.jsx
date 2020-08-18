import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../dashboard/Login';
import ProtectedRoute from "./protectedRoute";
import Dashboard from "../dashboard/Dashboard";
import ClubPlayers from '../dashboard/ClubPlayers';
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';
import TableEntry from '../admin/TableEntry';


export default class RoutesSuperAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Switch>
                        <Route path="/superadmin" exact>
                            <Login usertype="/superadmin" />
                        </Route>
                        <Route path="/superadmin/login" exact>
                            <Login usertype="/superadmin" />
                        </Route>
                        <ProtectedRoute usertype="/superadmin" exact path="/superadmin/dashboard" component={Dashboard}></ProtectedRoute>
                        <ProtectedRoute usertype="/superadmin" exact path="/superadmin/club-registration" component={ClubRegistration}></ProtectedRoute>
                        <ProtectedRoute usertype="/superadmin" exact path="/superadmin/table-entry" component={TableEntry}></ProtectedRoute>
                        <ProtectedRoute usertype="/superadmin" exact path="/superadmin/cash-games/point-rummy" component={CG_PointRummy}></ProtectedRoute>
                        {/* <Route path="/dashboard" component={Dashboard}></Route> */}
                        <Route path="*">
                            <Redirect to="/superadmin/login" />
                        </Route>
                    </Switch>
                </HashRouter>
            </React.Fragment>
        )
    }
}
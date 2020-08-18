import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';
import Login from '../dashboard/Login';
import SuperAdminLogin from '../dashboard/SuperAdminLogin';
import AdminLogin from '../dashboard/AdminLogin';
import Games from '../games/Games';
import SuperAdminprotectedRoute from './SuperAdminprotectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute'
import ProtectedRoute from './protectedRoute'
import TableEntry from '../admin/TableEntry';



export default class AppRoutes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Login} />

                    <Route path="/superadmin/login" exact component={SuperAdminLogin} />
                    <Route exact path="/superadmin/dashboard" component={Dashboard} />
                    <Route exact path="/superadmin/club-registration" component={ClubRegistration} />
                    <Route exact path="/superadmin/table-entry" component={TableEntry} />
                    <Route exact path="/superadmin/cash-games/point-rummy" component={CG_PointRummy} />

                    <Route path="/admin/login" exact component={AdminLogin} />
                    <Route exact path="/admin/dashboard" component={Dashboard} />
                    <Route exact path="/admin/club-players" component={UserRegistration} />
                    <Route exact path="/admin/games" component={Games} />
                    <Route exact path="/admin/cash-games/point-rummy" component={CG_PointRummy} />


                    {/* <Route path="/dashboard" component={Dashboard}> */}

                    <Route path="/superadmin/*">
                        <Redirect to="/superadmin/login" />
                    </Route>
                    <Route path="/admin/*">
                        <Redirect to="/admin/login" />
                    </Route>
                </Switch>
            </HashRouter>
        )
    }
}
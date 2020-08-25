import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';
import Login from '../logins/Login';
import SuperAdminLogin from '../logins/SuperAdminLogin';
import AdminLogin from '../logins/AdminLogin';
import Games from '../games/Games';
import SuperAdminprotectedRoute from './SuperAdminprotectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute'
import ProtectedRoute from './protectedRoute'
import TableEntry from '../admin/TableEntry';
import Socket from '../socket/Socket';



export default class AppRoutes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <ProtectedRoute path="/dashboard" exact component={Dashboard} />

                    <Route path="/superadmin/login" exact component={SuperAdminLogin} />
                    <SuperAdminprotectedRoute exact path="/superadmin/dashboard" component={Dashboard} />
                    <SuperAdminprotectedRoute exact path="/superadmin/club-registration" component={ClubRegistration} />
                    <SuperAdminprotectedRoute exact path="/superadmin/cash-games/point-rummy" component={CG_PointRummy} />

                    <Route path="/admin/login" exact component={AdminLogin} />
                    <AdminProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
                    <AdminProtectedRoute exact path="/admin/club-players" component={UserRegistration} />
                    <AdminProtectedRoute exact path="/admin/table-entry" component={TableEntry} />
                    <AdminProtectedRoute exact path="/admin/games" component={Games} />
                    <AdminProtectedRoute exact path="/admin/cash-games/point-rummy" component={CG_PointRummy} />
                    <Route exact path="/socket" component={Socket} />

                    <Route path="/superadmin"><Redirect to="/superadmin/login" /></Route>
                    <Route path="/admin"><Redirect to="/admin/login" /></Route>
                    <Route path="/"><Redirect to="/login" /></Route>

                    <Route path="/superadmin/*"> <Redirect to="/superadmin/login" /></Route>
                    <Route path="/admin/*">  <Redirect to="/admin/login" /></Route>
                </Switch>
            </HashRouter>
        )
    }
}
import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';
import Login from '../dashboard/Login';
import SuperAdminLogin from '../dashboard/SuperAdminLogin';
import AdminLogin from '../dashboard/AdminLogin';
import SuperAdminprotectedRoute from './SuperAdminprotectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute'
import ProtectedRoute from './protectedRoute'



export default class AppRoutes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />

                    <Route path="/superadmin/login" exact component={SuperAdminLogin} />
                    <SuperAdminprotectedRoute exact path="/superadmin/dashboard" component={Dashboard} />
                    <SuperAdminprotectedRoute exact path="/superadmin/club-registration" component={ClubRegistration} />
                    <SuperAdminprotectedRoute exact path="/superadmin/cash-games/point-rummy" component={CG_PointRummy} />

                    <Route path="/admin/login" exact component={AdminLogin} />
                    <AdminProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
                    <AdminProtectedRoute exact path="/admin/club-players" component={UserRegistration} />
                    <AdminProtectedRoute exact path="/admin/cash-games/point-rummy" component={CG_PointRummy} />


                    {/* <Route path="/dashboard" component={Dashboard}> */}

                    <Route path="/superadmin/*">
                        <Redirect to="/superadmin/login" />
                    </Route>
                    <Route path="/admin/*">
                        <Redirect to="/admin/login" />
                    </Route>
                </Switch>
            </div>
        )
    }
}
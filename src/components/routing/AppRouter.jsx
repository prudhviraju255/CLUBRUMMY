import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ClubRegistration from '../registration/ClubRegistration';
import UserRegistration from '../userregistration/UserRegistration';
import CG_PointRummy from '../cashgames/CG_PointRummy';
import Login from '../dashboard/Login';



export default class AppRoutes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />

                    <Route path="/:admintype/login" usertype="/superadmin" exact component={Login} />

                    <Route usertype="/superadmin" exact path="/superadmin/dashboard" component={Dashboard} />
                    <Route usertype="/superadmin" exact path="/superadmin/club-registration" component={ClubRegistration} />
                    <Route usertype="/superadmin" exact path="/superadmin/cash-games/point-rummy" component={CG_PointRummy} />

                    <Route usertype="/admin" exact path="/admin/dashboard" component={Dashboard} />
                    <Route usertype="/admin" exact path="/admin/club-players" component={UserRegistration} />
                    <Route usertype="/admin" exact path="/admin/cash-games/point-rummy" component={CG_PointRummy} />


                    {/* <Route path="/dashboard" component={Dashboard}> */}

                </Switch>
            </div>
        )
    }
}
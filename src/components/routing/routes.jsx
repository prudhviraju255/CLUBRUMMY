import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import RoutesAdmin from './RoutesAdmin';
import RoutesSuperAdmin from "./RoutesSuperAdmin";
import RoutesUser from "./RoutesUser";



export default class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <HashRouter>
                    <Switch>

                        <Route path='/admin' component={RoutesAdmin} />
                        <Route path='/superadmin' component={RoutesSuperAdmin} />
                    </Switch>
                </HashRouter>
            </React.Fragment>
        )
    }
}
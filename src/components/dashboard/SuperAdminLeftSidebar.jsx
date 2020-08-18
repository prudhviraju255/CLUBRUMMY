import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from './Header';
import Dashboard from './Dashboard';

export class LeftSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cashGame: false
        }
    }

    cashGameStatus = () => {
        this.setState({ cashGame: !this.state.cashGame })
    }
    render() {
        return (
            <div>
                {/* sidebar start here */}
                <div className="vertical-menu">
                    <div className="h-100">
                        <div className="user-wid text-center py-4">
                            <div className="user-img">
                                <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-md mx-auto rounded-circle" />
                            </div>
                            <div className="mt-3">
                                <a href="#" className="text-dark font-weight-medium font-size-16">Administrator</a>
                                <p className="text-body mt-1 mb-0 font-size-13">Club Rummy</p>
                            </div>
                        </div>
                        {/*- Sidemenu */}
                        <div id="sidebar-menu">
                            {/* Left Menu Start */}
                            <ul className="metismenu list-unstyled" id="side-menu">
                                <li className="menu-title">Menu</li>
                                <Link to="/superadmin/dashboard">
                                    <li>
                                        <a className=" waves-effect">
                                            <i className="mdi mdi-calendar-text" />
                                            <span>Dashboard</span>
                                        </a>
                                    </li>
                                </Link>
                                <li>
                                    <Link to="/superadmin/club-registration" className=" waves-effect">
                                        <i className="mdi mdi-calendar-text" />
                                        <span>Clubs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/superadmin/table-entry" className=" waves-effect">
                                        <i className="mdi mdi-calendar-text" />
                                        <span>Table Entry</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* side bar ends here */}
            </div>
        )
    }
}

export default LeftSidebar

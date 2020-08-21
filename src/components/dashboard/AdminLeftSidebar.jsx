import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { userdetails } from '../redux/actions/LoginActions';
import { connect } from 'react-redux';

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
        const { user } = this.props;
        var username = "";
        const usertype = user ? user.userType : false;
        if (usertype && usertype == 2) {
            username = user ? user.clubname : false;
        } else {
            username = user ? user.username : false;
        }


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
                                <a className="text-dark font-weight-medium font-size-16">{username}</a>

                            </div>
                        </div>
                        {/*- Sidemenu */}
                        <div id="sidebar-menu">
                            {/* Left Menu Start */}
                            {usertype == 1 ?
                                <ul className="metismenu list-unstyled" id="side-menu">
                                    <li className="menu-title">Menu</li>

                                    <li>
                                        <Link to="/superadmin/dashboard" className=" waves-effect">
                                            <i className="mdi mdi-airplay" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/superadmin/club-registration" className=" waves-effect">
                                            <i className="mdi mdi-cards-club" />
                                            <span>Clubs</span>
                                        </Link>
                                    </li>

                                </ul> : null}

                            {usertype == 2 ?
                                <ul className="metismenu list-unstyled" id="side-menu">
                                    <li className="menu-title">Menu</li>

                                    <li>
                                        <Link to="/admin/dashboard" className="waves-effect">
                                            <i className="mdi mdi-airplay" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>



                                    <li>
                                        <Link to="/admin/club-players" className=" waves-effect">
                                            <i className="mdi mdi-account-circle-outline" />
                                            <span>Club Players</span>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link to="/admin/table-entry" className=" waves-effect">
                                            <i className="mdi mdi-clipboard-list-outline" />
                                            <span>Table Entry</span>
                                        </Link>
                                    </li>


                                    <Link to="/admin/games">
                                        <li>
                                            <a className=" waves-effect">
                                                <i className="mdi mdi-gamepad-variant-outline" />
                                                <span>Games</span>
                                            </a>
                                        </li>
                                    </Link>
                                </ul> : null}

                            {usertype == 3 ?
                                <ul className="metismenu list-unstyled" id="side-menu">
                                    <li className="menu-title">Menu</li>
                                    <Link to="/dashboard">
                                        <li>
                                            <a className=" waves-effect">
                                                <i className="mdi mdi-airplay" />
                                                <span>Dashboard</span>
                                            </a>
                                        </li>
                                    </Link>
                                </ul> : null}


                        </div>
                    </div>
                </div>
                {/* side bar ends here */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { user } = state.auth;
    return {
        user
    }
};

export default connect(mapStateToProps, null)(LeftSidebar);


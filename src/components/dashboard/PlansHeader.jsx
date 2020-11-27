import React, { Component } from 'react'
import { removeSession } from '../helpers/globalHelpers/GlobalHelperFunctions'
import { Link } from "react-router-dom";
import AdminLeftSidebar from './AdminLeftSidebar';
import SuperAdminLeftSidebar from './SuperAdminLeftSidebar';
import UserSidebar from './UserSidebar';
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { userdetails } from '../redux/actions/LoginActions';
import { connect } from 'react-redux';

const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    /**
     * Function for logout
     */
    logout = () => {
        removeSession();

    }

    redirectbyUser() {
        const { user } = this.props;
        if (!user) {
            return;
        };
        const usertype = user ? user.userType : false;
        switch (user.userType) {
            case 1:
                return (
                    <Link to='/superadmin/login' onClick={this.logout}>
                        < a className="dropdown-item text-danger" > <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" /> Logout</a ></Link >
                );
            case 2:
                return (
                    <Link to='/admin/login' onClick={this.logout}>
                        <a className="dropdown-item text-danger" ><i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" /> Logout</a></Link>
                );
            case 3:
                return (
                    <Link to='/login' onClick={this.logout}>
                        <a className="dropdown-item text-danger" ><i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" /> Logout</a></Link>
                );
            default:
                return null;
        }
    }

    render() {
        const { user } = this.props;
        const username = user ? user.clubname : false;
        return (
            <React.Fragment>


                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="container-fluid">
                            <div className="float-right">
                                <div className="dropdown d-inline-block d-lg-none ml-2">
                                    <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="mdi mdi-magnify" />
                                    </button>


                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-search-dropdown">
                                        <form className="p-3">
                                            <div className="form-group m-0">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div class="dropdown d-none d-lg-inline-block ml-1">
                                    <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="">
                                        <i class="mdi mdi-coin text-primary"></i>
                                        <span class="font-weight-bold">23,325</span>
                                    </button>

                                </div>
                                <div className="dropdown d-inline-block">
                                    <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="mdi mdi-bell-outline" />
                                        <span className="badge badge-danger badge-pill">3</span>
                                    </button>

                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-notifications-dropdown">
                                        <div className="p-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0"> Notifications </h6>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="#!" className="small"> View All</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-simplebar style={{ maxHeight: '230px' }}>
                                            <a href className="text-reset notification-item">
                                                <div className="media">
                                                    <div className="avatar-xs mr-3">
                                                        <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                            <i className="bx bx-cart" />
                                                        </span>
                                                    </div>
                                                    <div className="media-body">
                                                        <h6 className="mt-0 mb-1">Your order is placed</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">If several languages coalesce the grammar</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline" /> 3 min ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href className="text-reset notification-item">
                                                <div className="media">
                                                    <img src="/assets/images/users/avatar-3.jpg" className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="media-body">
                                                        <h6 className="mt-0 mb-1">James Lemire</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">It will seem like simplified English.</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline" /> 1 hours ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href className="text-reset notification-item">
                                                <div className="media">
                                                    <div className="avatar-xs mr-3">
                                                        <span className="avatar-title bg-success rounded-circle font-size-16">
                                                            <i className="bx bx-badge-check" />
                                                        </span>
                                                    </div>
                                                    <div className="media-body">
                                                        <h6 className="mt-0 mb-1">Your item is shipped</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">If several languages coalesce the grammar</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline" /> 3 min ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href className="text-reset notification-item">
                                                <div className="media">
                                                    <img src="/assets/images/users/avatar-4.jpg" className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="media-body">
                                                        <h6 className="mt-0 mb-1">Salena Layfield</h6>
                                                        <div className="font-size-12 text-muted">
                                                            <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                            <p className="mb-0"><i className="mdi mdi-clock-outline" /> 1 hours ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="p-2 border-top">
                                            <a className="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
                                                <i className="mdi mdi-arrow-right-circle mr-1" /> View More..
                        </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown d-inline-block">
                                    <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="d-none d-xl-inline-block ml-1">Profile</span>
                                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        {/* item*/}
                                        <a className="dropdown-item" href="#"><i className="bx bx-user font-size-16 align-middle mr-1" /> Profile</a>
                                        <a className="dropdown-item" href="#"><i className="bx bx-wallet font-size-16 align-middle mr-1" /> My Wallet</a>
                                        <a className="dropdown-item d-block" href="#"><span className="badge badge-success float-right">11</span><i className="bx bx-wrench font-size-16 align-middle mr-1" /> Settings</a>
                                        <a className="dropdown-item" href="#"><i className="bx bx-lock-open font-size-16 align-middle mr-1" /> Lock screen</a>
                                        <div className="dropdown-divider" />
                                        {this.redirectbyUser()}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* LOGO */}
                                <div className="navbar-brand-box">
                                    <a href="index.html" className="logo logo-dark">
                                        <span className="logo-sm">
                                            <img src="/assets/images/logo-sm.png" alt="" height={20} />
                                        </span>
                                        <span className="logo-lg">
                                            <img src="/assets/images/logo-dark.png" alt="" height={17} />
                                        </span>
                                    </a>
                                    <a href="index.html" className="logo logo-light">
                                        <span className="logo-sm">
                                            <img src="/assets/images/logo-sm.png" alt="" height={20} />
                                        </span>
                                        <span className="logo-lg d-flex">
                                            {/* <img src="/assets/images/logo-light.png" alt="" height="19"> */}
                                            <h4 className="text-white pt-4">ClubRummy</h4>
                                        </span>
                                    </a>
                                </div>
                                <button type="button" className="btn btn-sm px-3 font-size-16 header-item toggle-btn waves-effect" id="vertical-menu-btn">
                                    <i className="fa fa-fw fa-bars" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
    componentDidMount() {
        const user = getCacheObject(SESSION_KEY_NAME);
        this.props.setuserdetailsfromLocalstore(user);
    }
}


const mapStateToProps = state => {
    const { error, loading, user, isUserLogIn } = state.auth;
    return {
        user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setuserdetailsfromLocalstore: user => {
            dispatch(userdetails(user));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

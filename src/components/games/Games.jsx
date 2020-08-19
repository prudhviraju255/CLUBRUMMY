import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import GamesList from './GamesList';
import UpdateGame from './UpdateGame';
import DeleteGameConfirmation from './DeleteGameConfirmation';
import Constants from '../helpers/Constans';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const ACTION_STATUS = Constants.ACTION_STATUS;


export class ClubRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_updated_users: true,
            show_edit_users: true,
            show_delete_user_popup: true,
            updated_user: {},
            deleted_user: {},
        }
    }

    componentDidMount() {


    }

    render() {
        return (
            <div className="container-fluid">
                {/* Begin page */}
                <ToastContainer />
                <div id="layout-wrapper">
                    <Header />

                    {/* Start right Content here */}
                    {/* ============================================================== */}
                    <div className="main-content">
                        <div className="page-content">
                            {/* start page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">Games</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
                            <DeleteGameConfirmation
                                isUpdateUsersList={this.isUpdateUsersList}
                                deleted_user={this.state.deleted_user} />
                            <UpdateGame
                                isUpdateUsersList={this.isUpdateUsersList}
                                updated_user={this.state.updated_user} />

                            <GamesList
                                editUser={this.editUser}
                                deleteUser={this.deleteUser}
                                isUpdateUsersList={this.isUpdateUsersList}
                                updateusers={this.state.get_updated_users} />
                        </div>
                        {/* End Page-content */}
                        <Footer />
                    </div>
                    {/* end main content*/}
                </div>
                {/* END layout-wrapper */}
            </div>
        )
    }

    isUpdateUsersList = (status, ACTION) => {
        if (status && ACTION === ACTION_STATUS.CREATE) {
            toast.success('Created Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
        if (status && ACTION === ACTION_STATUS.UPDATE) {
            toast.success('Updated Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else if (status && ACTION === ACTION_STATUS.DELETE) {
            toast.info('Deleted Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
        this.setState({ get_updated_users: status });
    }

    editUser = (user) => {
        console.log("edited user", user);
        this.setState({ updated_user: user })
    }

    deleteUser = (user) => {
        console.log("deleted user", user);
        this.setState({ deleted_user: user })
    }

}

export default ClubRegistration

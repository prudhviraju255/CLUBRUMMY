import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './RegisteredUsers';
import CreateClubRegisterUser from './CreateUser';
import UpdateClubRegisterUser from './UpdateUser';
import DeleteClubConfirmation from './DeleteUserConfirmation';
import $ from 'jquery';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


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
                    <h4 className="page-title mb-0 font-size-18">User Registration</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <DeleteClubConfirmation
                isUpdateUsersList={this.isUpdateUsersList}
                deleted_user={this.state.deleted_user} />
              <UpdateClubRegisterUser
                isUpdateUsersList={this.isUpdateUsersList}
                updated_user={this.state.updated_user} />
              <CreateClubRegisterUser isUpdateUsersList={this.isUpdateUsersList} />
              <ClubRegistratedUsers
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

  isUpdateUsersList = (status) => {
    console.log("üpdate status", status);
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

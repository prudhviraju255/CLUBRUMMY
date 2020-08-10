import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './ClubRegisteredUsers';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class ClubRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      register: false,
      clubName: "",
      clubType: "",
      clubLocation: "",
      mobileno: "",
      email: "",
      username: "",
      password: "",
      error: false,
      errorMessage: ""
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
                    <h4 className="page-title mb-0 font-size-18">Club Registration</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-12">
                  <div className="card box-big-shadow">
                    <h4 className="card-header mt-0">Add New Player</h4>
                    <div className="card-body">
                      <form className="repeater" encType="multipart/form-data">
                        <div data-repeater-list="group-a">
                          <div data-repeater-item className="row">
                            <div className="form-group col-lg-3">
                              <label htmlFor="name">Club Name</label>
                              <input type="text" id="clubName" ref="clubName" name="clubName" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group col-lg-3">
                              <label htmlFor="name">Club Type</label>
                              <input type="text" id="clubType" ref="clubType" name="clubType" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group col-lg-3">
                              <label htmlFor="name">Club Location</label>
                              <input type="text" id="clubLocation" ref="clubLocation" name="clubLocation" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group col-lg-3">
                              <label htmlFor="subject">Mobile</label>
                              <input type="text" id="mobileno" ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group col-lg-3">
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" ref="email" name="email" onChange={this.handleChange} className="form-control" />
                            </div>

                            <div className="form-group col-lg-3">
                              <label htmlFor="subject">Username</label>
                              <input type="text" id="username" ref="username" name="username" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group col-lg-3">
                              <label htmlFor="subject">Password</label>
                              <input type="password" id="password" ref="password" name="password" onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="col-lg-2 align-self-center">
                              <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" onClick={() => this.clubregistration()} >Add Club</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
              <ClubRegistratedUsers />
              {/* end row */}
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

  handleChange = (e) => {
    this.state[e.target.name] = e.target.value;
  }

  async clubregistration() {
    if (this.state.username == "" || this.state.password == "") {
      this.setState({ error: true })
      return false;
    }
    let dataObject = {
      clubName: this.state.clubName,
      clubType: this.state.clubType,
      clubLocation: this.state.clubLocation,
      mobileno: this.state.mobileno,
      email: this.state.email,
      username: this.state.username,
      password: this.state.username,
    };
    var userRegistration = await postServiceCALLS(
      ServiceUrls.CLUB_REGISTERATION,
      {},
      dataObject
    );
    console.log(dataObject);
    if (userRegistration.code === 400) {
      await this.setState({ error: true });
    } else if (userRegistration.code === 200) {
      this.clearRegisteration();
    }
  }

  clearRegisteration() {
    this.refs.clubName.value = "";
    this.refs.clubName.value = "";
    this.refs.clubType.value = "";
    this.refs.clubLocation.value = "";
    this.refs.mobileno.value = "";
    this.refs.email.value = "";
    this.refs.username.value = "";
    this.refs.password.value = "";
  }

}

export default ClubRegistration

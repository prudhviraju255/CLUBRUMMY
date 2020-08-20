import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './ClubRegisteredUsers';
import Constants from '../helpers/Constans';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const ACTION_STATUS = Constants.ACTION_STATUS;


export class CreateClubRegisterUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            register: false,
            clubName: "",
            clubType: 0,
            clubLocation: "",
            mobileno: "",
            email: "",
            username: "",
            password: "",
            error: false,
            errorMessage: "",
            canUseAsUsername: true
        }
    }

    componentDidMount() {


    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card box-big-shadow">
                        <h4 className="card-header mt-0">Add New Club</h4>
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
                                            <select className="form-control" ref="clubType" name="clubType" onChange={this.handleChange} id="clubType" >
                                                <option value='0' >Bronze</option>
                                                <option value='1'>Silver</option>
                                                <option value='2'>Gold</option>
                                                <option value='3'>Diamond</option>
                                                <option value='4'>platinum</option>
                                            </select>

                                        </div>
                                        <div className="form-group col-lg-3">
                                            <label htmlFor="name">Club Location</label>
                                            <input type="text" id="clubLocation" ref="clubLocation" name="clubLocation" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-3">
                                            <label htmlFor="subject">Mobile</label>
                                            <input type="number" id="mobileno" ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
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
                            <p>{this.state.errorMessage}</p>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    handleChange = (e) => {
        this.state[e.target.name] = e.target.value;
        if (e.target.name == "username") {
            this.validateUserexist(e.target.value)
        }

    }

    async validateUserexist(username) {
        let dataObject = {
            username: username
        };
        var userexist = await postServiceCALLS(
            ServiceUrls.CHECK_CLUB_USERNAME_EXIST,
            {},
            dataObject
        );

        if (userexist.code === 400) {
            await this.setState({ error: true, canUseAsUsername: userexist.data ? userexist.data.canUseAsUsername : "", errorMessage: userexist.message });
        } else if (userexist.code === 200) {
            await this.setState({ error: false, canUseAsUsername: userexist.data ? userexist.data.canUseAsUsername : "", errorMessage: userexist.message });

        }
    }

    async clubregistration() {
        const user = getCacheObject(SESSION_KEY_NAME);
        let dataObject = {
            clubname: this.state.clubName,
            clubtype: this.state.clubType,
            clublocation: this.state.clubLocation,
            mobileno: this.state.mobileno,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            superAdminId: user._id
        };
        var validation = this.validateform(dataObject);
        if (validation.error) {
            await this.setState({ error: validation.error, errorMessage: validation.errorMessage });
            return;
        }


        var userRegistration = await postServiceCALLS(
            ServiceUrls.CLUB_CREATE_USER,
            {},
            dataObject
        );
        console.log(dataObject);
        if (userRegistration.code === 400) {
            await this.setState({ error: true, errorMessage: userRegistration.message.join(", ") });
        } else if (userRegistration.code === 200) {
            this.clearRegisteration();
            this.props.isUpdateUsersList(true, ACTION_STATUS.CREATE);
        }
    }

    validateform(dataObject) {
        var response = { error: false, errorMessage: "" };

        if (dataObject.clubname == "" || dataObject.clublocation == ""
            || dataObject.mobileno == "" || dataObject.email == "" || dataObject.username == ""
            || dataObject.password == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else if (!this.state.canUseAsUsername) {
            response.error = true;
            response.errorMessage = "Username already taken, please retry another one";
            return response;
        } else {
            return response;
        }
    }

    clearRegisteration() {
        this.refs.clubName.value = "";
        this.refs.clubName.value = "";
        this.refs.clubType.value = 0;
        this.refs.clubLocation.value = "";
        this.refs.mobileno.value = "";
        this.refs.email.value = "";
        this.refs.username.value = "";
        this.refs.password.value = "";
    }

}

export default CreateClubRegisterUser

import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './ClubRegisteredUsers';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class CreateClubRegisterUser extends Component {
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
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="repeater" encType="multipart/form-data">
                                <div data-repeater-list="group-a">
                                    <div data-repeater-item className="row">
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Name</label>
                                            <input type="text" id="clubName" ref="clubName" name="clubName" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Type</label>
                                            <input type="text" id="clubType" ref="clubType" name="clubType" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Location</label>
                                            <input type="text" id="clubLocation" ref="clubLocation" name="clubLocation" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="subject">Mobile</label>
                                            <input type="text" id="mobileno" ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" ref="email" name="email" onChange={this.handleChange} className="form-control" />
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="subject">Username</label>
                                            <input type="text" id="username" ref="username" name="username" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="subject">Password</label>
                                            <input type="password" id="password" ref="password" name="password" onChange={this.handleChange} className="form-control" />
                                        </div>

                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
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

export default CreateClubRegisterUser

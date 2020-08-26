import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { hasWhiteSpace, validateEmail } from '../helpers/globalHelpers/Utils';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './ClubRegisteredUsers';
import $ from 'jquery';
import Constants from '../helpers/Constans';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const ACTION_STATUS = Constants.ACTION_STATUS;

export class UpdateClubRegisterUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            register: false,
            clubName: "",
            clubType: 0,
            clubLocation: "",
            mobileno: "",
            email: "",
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {


    }

    render() {
        return (
            <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Club info</h5>
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
                                            <input type="text" id="clubName" value={this.state.clubName} ref="clubName" name="clubName" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Type</label>
                                            <select className="form-control" value={this.state.clubType} ref="clubType" name="clubType" onChange={this.handleChange} id="clubType" >
                                                <option value='0'>Bronze</option>
                                                <option value='1'>Silver</option>
                                                <option value='2'>Gold</option>
                                                <option value='3'>Diamond</option>
                                                <option value='4'> platinum</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Location</label>
                                            <input type="text" id="clubLocation" value={this.state.clubLocation} ref="clubLocation" name="clubLocation" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="subject">Mobile</label>
                                            <input type="text" id="mobileno" value={this.state.mobileno} ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" value={this.state.email} ref="email" name="email" onChange={this.handleChange} className="form-control" />
                                        </div>



                                    </div>
                                </div>
                            </form>
                            <p>{this.state.errorMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.editclubuser()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async editclubuser() {

        let dataObject = {
            _id: this.state._id,
            clubname: this.state.clubName,
            clubtype: this.state.clubType,
            clublocation: this.state.clubLocation,
            mobileno: this.state.mobileno,
            email: this.state.email,

        };
        var validation = this.validateform(dataObject);
        if (validation.error) {
            await this.setState({ error: validation.error, errorMessage: validation.errorMessage });
            return;
        }

        var userRegistration = await postServiceCALLS(
            ServiceUrls.UPDATE_CLUB,
            {},
            dataObject
        );
        console.log(dataObject);
        if (userRegistration.code === 400) {
            await this.setState({ error: true, errorMessage: userRegistration.message });
        } else if (userRegistration.code === 200) {
            this.clearRegisteration();
            window.$('#exampleModal').modal('hide');
            this.props.isUpdateUsersList(true, ACTION_STATUS.UPDATE);
        }
    }

    validateform(dataObject) {
        var response = { error: false, errorMessage: "" };

        if (dataObject.clubname.trim() == "" || dataObject.clublocation == ""
            || dataObject.mobileno == "" || dataObject.email.trim() == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else if (!validateEmail(dataObject.email)) {
            response.error = true;
            response.errorMessage = "Enter valid Email.";
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

    }



    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            updated_user: nextProps.updated_user,
        };
    }

    componentDidUpdate(nextProps) {
        const { updated_user } = this.props
        console.log('componentDidUpdate', updated_user, nextProps)
        if (nextProps.updated_user._id !== updated_user._id) {
            this.clearRegisteration();
            this.setState({
                clubName: updated_user.clubname,
                clubType: updated_user.clubtype,
                clubLocation: updated_user.clublocation,
                mobileno: updated_user.mobileno,
                email: updated_user.email,
                errorMessage: "",
                _id: updated_user._id,
            })
        }
    }



}

export default UpdateClubRegisterUser

import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            mobileno: "",
            username: "",
            password: "",
            clubId: "",
            register: false,
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
                        <h4 className="card-header mt-0">Add New User</h4>
                        <div className="card-body">
                            <form className="repeater" encType="multipart/form-data">
                                <div data-repeater-list="group-a">
                                    <div data-repeater-item className="row">
                                        <div className="form-group col-lg-3">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" id="firstname" ref="firstname" name="firstname" onChange={this.handleChange} className="form-control" />
                                        </div>

                                        <div className="form-group col-lg-3">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="text" id="lastname" ref="lastname" name="lastname" onChange={this.handleChange} className="form-control" />
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
            ServiceUrls.CHECK_USERNAME_EXIST,
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            clubId: "5f310e4145d54715a0c5e4f3"
        };
        var validation = this.validateform(dataObject);
        if (validation.error) {
            await this.setState({ error: validation.error, errorMessage: validation.errorMessage });
            return;
        }


        var userRegistration = await postServiceCALLS(
            ServiceUrls.CREATE_USER,
            {},
            dataObject
        );
        console.log(dataObject);
        if (userRegistration.code === 400) {
            await this.setState({ error: true, errorMessage: userRegistration.message.join(", ") });
        } else if (userRegistration.code === 200) {
            this.clearRegisteration();
            this.props.isUpdateUsersList(true);
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
        this.refs.firstname.value = "";
        this.refs.lastname.value = "";
        this.refs.email.value = "";
        this.refs.username.value = "";
        this.refs.password.value = "";
    }

}

export default CreateUser

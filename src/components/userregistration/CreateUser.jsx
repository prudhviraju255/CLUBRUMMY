import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { hasWhiteSpace } from '../helpers/globalHelpers/Utils';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import Constants from '../helpers/Constans';
import { isupdateclub } from '../redux/actions/ClubPlayersRegistrationActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
const ACTION_STATUS = Constants.ACTION_STATUS;
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
                    <div className="card">


                    </div>
                    <div className="card box-big-shadow">
                        <div className="card-body">

                            <h4 className="">Add New User</h4>

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
                                            <label htmlFor="email">MobileNo</label>
                                            <input type="email" id="mobileno" ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
                                        </div>

                                        <div className="form-group col-lg-3">
                                            <label htmlFor="subject">Username</label>
                                            <input type="text" id="username" ref="username" name="username" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-3">
                                            <label htmlFor="subject">Password</label>
                                            <input type="password" id="password" ref="password" name="password" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="col-lg-2 align-self-cente">
                                            <label htmlFor="subject">&nbsp;</label>
                                            <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" onClick={() => this.clubregistration()} >Add User</button>
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
            if (hasWhiteSpace(e.target.value)) {
                this.setState({ error: true, canUseAsUsername: false, errorMessage: "username should not contain space" });
                return;
            }
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
        const { user } = this.props;
        let dataObject = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            mobileno: this.state.mobileno,
            username: this.state.username,
            password: this.state.password,
            clubId: user._id
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
            toast.success('Created Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            this.props.isupdateclub(true);
        }
    }

    validateform(dataObject) {
        var response = { error: false, errorMessage: "" };

        if (dataObject.firstname.trim() == "" || dataObject.lastname.trim() == ""
            || dataObject.email.trim() == "" || dataObject.mobileno == "" || dataObject.username == ""
            || dataObject.password == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else if (hasWhiteSpace(dataObject.username)) {
            response.error = true;
            response.errorMessage = "username should not contain space";
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
        this.refs.mobileno.value = "";
        this.refs.password.value = "";
    }

}


const mapStateToProps = state => {
    const { error, loading, clubs } = state.clubsInfo;
    const { user } = state.auth;
    return {
        clubs,
        user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        isupdateclub: (tf) => {
            dispatch(isupdateclub(tf));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);

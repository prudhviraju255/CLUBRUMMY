import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { hasWhiteSpace } from '../helpers/globalHelpers/Utils';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import $ from 'jquery';
import Constants from '../helpers/Constans';
import { isupdateclub } from '../redux/actions/ClubPlayersRegistrationActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
const ACTION_STATUS = Constants.ACTION_STATUS;
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class UpdateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            register: false,
            firstname: "",
            lastname: "",
            email: "",
            mobileno: "",
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
                            <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="repeater" encType="multipart/form-data">
                                <div data-repeater-list="group-a">
                                    <div data-repeater-item className="row">
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" id="firstname" value={this.state.firstname} ref="firstname" name="firstname" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Last Type</label>
                                            <input type="text" id="lastname" value={this.state.lastname} ref="lastname" name="lastname" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Mobile Number</label>
                                            <input type="number" id="mobileno" value={this.state.mobileno} ref="mobileno" name="mobileno" onChange={this.handleChange} className="form-control" />
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
        //  this.state[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value })
    }

    async editclubuser() {

        let dataObject = {
            _id: this.state._id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            mobileno: this.state.mobileno,
            email: this.state.email,

        };
        var validation = this.validateform(dataObject);
        if (validation.error) {
            await this.setState({ error: validation.error, errorMessage: validation.errorMessage });
            return;
        }
        var userRegistration = await postServiceCALLS(
            ServiceUrls.UPDATE_USER,
            {},
            dataObject
        );
        console.log(dataObject);
        if (userRegistration.code === 400) {
            await this.setState({ error: true, errorMessage: userRegistration.message });
        } else if (userRegistration.code === 200) {
            this.clearRegisteration();
            window.$('#exampleModal').modal('hide');
            toast.success('Update Successfully.', {
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
            || dataObject.email.trim() == "" || dataObject.mobileno == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else {
            return response;
        }
    }

    clearRegisteration() {
        this.refs.firstname.value = "";
        this.refs.lastname.value = "";
        this.refs.email.value = "";
        this.refs.mobileno.value = "";
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
                firstname: updated_user.firstname,
                lastname: updated_user.lastname,
                email: updated_user.email,
                mobileno: updated_user.mobileno,
                errorMessage: "",
                _id: updated_user._id,
            })
        }
    }



}


const mapDispatchToProps = dispatch => {
    return {
        isupdateclub: (tf) => {
            dispatch(isupdateclub(tf));
        }
    };
};
export default connect(null, mapDispatchToProps)(UpdateUser);

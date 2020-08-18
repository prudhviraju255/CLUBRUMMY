import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import $ from 'jquery';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class UpdateClubRegisterUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            register: false,
            tableName: "",
            tableStatus: "",
            tableNo: "",
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
                                            <input type="text" id="tableName" value={this.state.tableName} ref="tableName" name="tableName" onChange={this.handleChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Type</label>
                                            <select className="form-control" ref="tableStatus" name="tableStatus" onChange={this.handleChange} id="tableStatus" >
                                                <option value='0' selected={this.state.tableStatus == 0}>Active</option>
                                                <option value='1' selected={this.state.tableStatus == 1}>Stop</option>

                                            </select>
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Club Location</label>
                                            <input type="text" id="tableNo" value={this.state.tableNo} ref="tableNo" name="tableNo" onChange={this.handleChange} className="form-control" />
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
        //  this.state[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value })
    }

    async editclubuser() {
        if (this.state.username == "" || this.state.password == "") {
            this.setState({ error: true })
            return false;
        }
        let dataObject = {
            _id: this.state._id,
            tableName: this.state.tableName,
            tableStatus: this.state.tableStatus,
            tableNo: this.state.tableNo,
            mobileno: this.state.mobileno,
            email: this.state.email,

        };
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
            this.props.isUpdateUsersList(true);
        }
    }

    clearRegisteration() {
        this.refs.tableName.value = "";
        this.refs.tableStatus.value = 0;
        this.refs.tableNo.value = "";
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
                tableName: updated_user.tableName,
                tableStatus: updated_user.tableStatus,
                tableNo: updated_user.tableNo,
                mobileno: updated_user.mobileno,
                email: updated_user.email,
                _id: updated_user._id,
            })
        }
    }



}

export default UpdateClubRegisterUser

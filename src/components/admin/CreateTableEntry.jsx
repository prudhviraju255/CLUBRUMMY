import React, { Component } from 'react'
import { Header } from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import DeleteClubConfirmation from '../registration/DeleteClubConfirmation'
import UpdateClubRegisterUser from '../registration/UpdateClubRegisterUser'
import CreateClubRegisterUser from '../registration/CreateClubRegisterUser'
import ClubRegistratedUsers from '../registration/ClubRegisteredUsers'
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ServiceUrls from '../helpers/ServiceUrls'
import { postServiceCALLS } from '../serviceCalls/ServiceCalls'
import { ToastContainer, toast } from 'react-toastify';
import config from '../../config';
import Constants from '../helpers/Constans';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
const ACTION_STATUS = Constants.ACTION_STATUS;

export class CreateTableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pools: 0,
            tableName: "",
            tableNo: "",
            bet: "",
            capacity: "",
            error: false,
            errorMessage: "",
            noUsersFound: false,
            clubUsers: [],
            items: [],
            checkedItems: [],
            createdBy: "",
            is_edit_screen: false,
        }
    }

    componentDidMount() {
        const { updated_user, is_edit_screen } = this.props;
        console.log('componentDidMount>>>>>>>>>>>>>>', updated_user);
        this.clearInputFields();
        this.getuseronload();
        if (false) {
            this.setState({
                is_edit_screen: is_edit_screen,
                _id: updated_user._id,
                pools: updated_user.pools,
                tableName: updated_user.tableName,
                tableNo: updated_user.tableNo,
                bet: updated_user.bet,
                capacity: parseInt(updated_user.capacity),
            })

        }


    }

    render() {
        var rows = []

        this.state.clubUsers.forEach((t, sno) => {
            rows.push(
                <tr key={sno}>
                    <td><input type="checkbox" value={sno} checked={t.checked} onChange={(e) => this.onToggle(e)} /></td>
                    <td>{t.username}</td>
                    <td>{t.email}</td>
                    <td>{t.mobileno}</td>
                </tr>
            );
        });
        console.log('pool>>>>>>>>', this.state.pools)
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card box-big-shadow">
                        <div className="card-body">
                            {this.state.is_edit_screen ?
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a onClick={() => this.props.isUpdateUsersList(true, ACTION_STATUS.OTHERS)}>Games</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">{this.state.tableName}</li>
                                    </ol>
                                </nav> :
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a>Create GameTable</a></li>
                                    </ol>
                                </nav>}
                        </div>


                        <div className="col-lg-2 align-self-center">
                            <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" onClick={() => this.submitTableEntry()} >Submit</button>
                        </div>
                        {this.state.noUsersFound == true && <p className="text-danger">No users found</p>}
                        <p className="text-danger">{this.state.errorMessage}</p>

                        <div className="card-body">
                            <form className="repeater" encType="multipart/form-data">
                                <div data-repeater-list="group-a">
                                    <div data-repeater-item className="row">

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Pools</label>
                                            <select className="form-control" value={this.state.pools} ref="pools" name="pools" id="pools" onChange={this.handleChange}>
                                                <option value='0' >-- Select --</option>
                                                <option value='1' >101 pools</option>
                                                <option value='2' >201 pools</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Table Name</label>
                                            <input type="text" placeholder="Enter Table Name" value={this.state.tableName} id="tableName" ref="tableName" name="tableName" className="form-control" onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="subject">Table Number</label>
                                            <input type="number" placeholder="Enter Table Number" value={this.state.tableNo} id="tableNo" ref="tableNo" name="tableNo" onChange={this.handleChange} className="form-control removeSpinner" />
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Bet/Entry</label>
                                            <input type="text" placeholder="Enter Bet" value={this.state.bet} id="bet" ref="bet" onChange={this.handleChange} name="bet" className="form-control" />
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="name">Sitting Capacity</label>
                                            <select className="form-control" value={this.state.capacity} ref="capacity" name="capacity" id="capacity" onChange={this.handleChange}>
                                                <option value='0'>-- Select --</option>
                                                <option value='1'>2 Seats</option>
                                                <option value='2'>6 Seats</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {this.state.clubUsers.length > 0 ?
                            <div className="card-body">
                                <h4 className="card-title mb-4"><span>Users</span></h4>
                                <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div> : null}
                    </div>
                </div>
            </div >


        )
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // this.state[e.target.name] = e.target.value;

    }

    async getuseronload() {
        const { updated_user, is_edit_screen } = this.props
        const admin = getCacheObject(SESSION_KEY_NAME);
        var clubId = admin._id;
        var clubUserList = {
            clubId: clubId,
            search_string: "",
            limit: 0,
            page: 0,
            sorting: { "_id": 1 }
        }

        var users = await postServiceCALLS(
            ServiceUrls.CLUB_USERS,
            {},
            clubUserList
        );
        if (users.data.data !== null) {
            var assignCheck = users.data.data
            assignCheck.map((data) => {
                if (is_edit_screen && updated_user.users.indexOf(data.username) > -1) {
                    data["checked"] = true;

                } else {
                    data["checked"] = false;
                }

            })
            if (is_edit_screen) {
                var checkedItems = assignCheck.filter(item => item.checked)
                this.setState({
                    clubUsers: assignCheck,
                    createdBy: clubId,
                    is_edit_screen: is_edit_screen,
                    _id: updated_user._id,
                    pools: updated_user.pools,
                    tableName: updated_user.tableName,
                    tableNo: updated_user.tableNo,
                    bet: updated_user.bet,
                    capacity: parseInt(updated_user.capacity),
                    checkedItems: checkedItems
                })
            } else {
                this.setState({ clubUsers: assignCheck, createdBy: clubId })
            }

        } else {
            //no users list data
            if (is_edit_screen) {
                this.setState({
                    noUsersFound: true,
                    is_edit_screen: is_edit_screen,
                    _id: updated_user._id,
                    pools: updated_user.pools,
                    tableName: updated_user.tableName,
                    tableNo: updated_user.tableNo,
                    bet: updated_user.bet,
                    capacity: parseInt(updated_user.capacity),
                })
            } else {
                this.setState({ noUsersFound: true })
            }
        }
    }

    async submitTableEntry() {
        const { updated_user, is_edit_screen } = this.props
        let dataObject = {
            gameType: 1,
            pointValue: 1,
            pools: parseInt(this.state.pools),
            tableName: this.state.tableName,
            tableNo: this.state.tableNo,
            bet: this.state.bet,
            capacity: parseInt(this.state.capacity),
            createdBy: this.state.createdBy
        };
        if (is_edit_screen) {
            dataObject["_id"] = updated_user._id;
        }

        var validation = this.validateform(dataObject);
        if (validation.error) {
            await this.setState({ error: validation.error, errorMessage: validation.errorMessage });
            return;
        }
        this.setState({
            error: false,
            errorMessage: ""
        })
        var ids = [];
        this.state.checkedItems.map((data) => {
            ids.push(data._id)
        })
        var seat;
        if (this.state.capacity == 1) {
            seat = 2
        } if (this.state.capacity == 2) {
            seat = 6
        }
        if (seat === ids.length) {
            dataObject["users"] = ids;
            var addTableEntry = await postServiceCALLS(
                is_edit_screen ? ServiceUrls.UPDATE_TABLE : ServiceUrls.ADD_TABLE,
                {},
                dataObject
            );
            if (addTableEntry.code == 200) {
                if (is_edit_screen) {
                    toast.success('Updated Successfully.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                    this.props.isUpdateUsersList(true, ACTION_STATUS.OTHERS);
                    return;
                } else {
                    toast.success('Added Successfully.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
                    this.setState({
                        pools: 0,
                        tableName: "",
                        tableNo: "",
                        bet: "",
                        capacity: "",
                        error: false,
                        errorMessage: "",
                        noUsersFound: false,
                        clubUsers: [],
                        items: [],
                        checkedItems: [],
                        createdBy: ""
                    })
                }

                this.clearInputFields()
            }
        } else {
            alert("please select users with the appropriate seating capacity")
        }
    }

    clearInputFields() {
        this.refs.pools.value = 0;
        this.refs.tableName.value = "";
        this.refs.tableNo.value = "";
        this.refs.bet.value = "";
        this.refs.capacity.value = 0;
    }

    async onToggle(e) {
        var index = e.target.value;

        let newItems = this.state.clubUsers.slice();
        newItems[index].checked = !newItems[index].checked
        await this.setState({
            clubUsers: newItems
        })
        var checkedItems = this.state.clubUsers.filter(item => item.checked)
        this.setState({ checkedItems })
    }

    validateform(dataObject) {
        var response = { error: false, errorMessage: "" };

        if (dataObject.pools == "" || dataObject.tableName == ""
            || dataObject.tableNo == "" || dataObject.bet == "" || dataObject.capacity == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else {
            return response;
        }
    }
}

export default CreateTableEntry

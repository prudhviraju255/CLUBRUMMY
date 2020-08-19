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
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export class CreateTableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pool: 0,
            tableName: "",
            tableNo: "",
            bet: "",
            seats: "",
            tableStatus: "",
            error: false,
            errorMessage: "",
            noUsersFound: false,
            clubUsers: [],
            items: [],
            checkedItems: [],
            createdBy: ""
        }
    }

    componentDidMount() {

    }

    render() {
        var rows = []

        this.state.clubUsers.forEach((t, sno) => {
            rows.push(
                <tr key={sno}>
                    <td><input type="checkbox" value={sno} onChange={(e) => this.onToggle(e)} /></td>
                    <td>{t.username}</td>
                    <td>{t.email}</td>
                    <td>{t.mobileno}</td>
                </tr>
            );
        });

        return (
            <div className="container-fluid">
                {/* Begin page */}
                <ToastContainer />
                <div id="layout-wrapper">
                    {/* <Header /> */}

                    {/* Start right Content here */}
                    {/* ============================================================== */}
                    <div className="main-content">
                        <div className="page-content">
                            {/* start page title */}
                            {/* <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">Table Entry</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* end page title */}
                            <div className="card box-big-shadow">
                                <h4 className="card-header mt-0">Table Details</h4>
                                <div className="card-body">
                                    <form className="repeater" encType="multipart/form-data">
                                        <div className="col-lg-2 align-self-center">
                                            <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" onClick={() => this.submitTableEntry()}>Submit</button>
                                        </div>
                                        {this.state.noUsersFound == true && <p className="text-danger">No users found</p>}
                                        <p className="text-danger">{this.state.errorMessage}</p>

                                        <div data-repeater-list="group-a">

                                            <div data-repeater-item className="row">

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="name">Pools</label>
                                                    <select className="form-control" ref="pool" name="pool" id="pool" onChange={this.handleChange}>
                                                        <option>-- Select --</option>
                                                        <option value='1'>101 pools</option>
                                                        <option value='2'>201 pools</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="name">Table Name</label>
                                                    <input type="text" placeholder="Enter Table Name" id="tableName" ref="tableName" name="tableName" className="form-control" onChange={this.handleChange} />
                                                </div>

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="subject">Table Number</label>
                                                    <input type="number" placeholder="Enter Table Number" id="tableNo" ref="tableNo" name="tableNo" onChange={this.handleChange} className="form-control removeSpinner" />
                                                </div>

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="name">Bet/Entry</label>
                                                    <input type="text" placeholder="Enter Bet" id="bet" ref="bet" onChange={this.handleChange} name="bet" className="form-control" />
                                                </div>

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="name">Sitting Capacity</label>
                                                    <select className="form-control" ref="seats" name="seats" id="seats" onChange={this.handleChange}>
                                                        <option>-- Select --</option>
                                                        <option value='1'>2 Seats</option>
                                                        <option value='2'>6 Seats</option>
                                                    </select>
                                                </div>

                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="name">Table Status</label>
                                                    <select className="form-control" ref="tableStatus" name="tableStatus" id="tableStatus" onChange={this.handleChange}>
                                                        <option>-- Select --</option>
                                                        <option value='1'>Stop</option>
                                                        <option value='2'>Live</option>
                                                    </select>
                                                </div>


                                                {this.state.clubUsers.length > 0 ?
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
                                                    : null}
                                            </div>
                                        </div>
                                    </form>
                                    {/* {this.state.noUsersFound == true && <p className="text-danger">No users found</p>}
                                    <p className="text-danger">{this.state.errorMessage}</p> */}
                                </div>
                            </div>

                        </div>
                        {/* End Page-content */}
                        {/* <Footer /> */}
                    </div>
                    {/* end main content*/}
                </div>
                {/* END layout-wrapper */}
            </div>
        )
    }

    handleChange = async (e) => {
        this.state[e.target.name] = e.target.value;
        if (this.state.seats !== "") {
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
                    data["checked"] = false;
                })
                this.setState({ clubUsers: assignCheck, createdBy: clubId })
            } else {
                this.setState({ noUsersFound: true })
            }
        }
    }

    async submitTableEntry() {
        let dataObject = {
            gameType: 2,
            pointValue: 1,
            pools: parseInt(this.state.pool),
            tableName: this.state.tableName,
            tableNo: this.state.tableNo,
            bet: this.state.bet,
            capacity: parseInt(this.state.seats),
            tableStatus: this.state.tableStatus,
            createdBy: this.state.createdBy
        };

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
        if (this.state.seats == 1) {
            seat = 2
        } if (this.state.seats == 2) {
            seat = 6
        }
        if (seat === ids.length) {
            dataObject["users"] = ids;
            var addTableEntry = await postServiceCALLS(
                ServiceUrls.ADD_TABLE,
                {},
                dataObject
            );
            if (addTableEntry.code == 200) {
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
                    pool: 0,
                    tableName: "",
                    tableNo: "",
                    bet: "",
                    seats: "",
                    error: false,
                    errorMessage: "",
                    noUsersFound: false,
                    clubUsers: [],
                    items: [],
                    checkedItems: [],
                    createdBy: ""
                })
                this.clearInputFields()
            }
        } else {
            alert("please select users with the appropriate seating capacity")
        }
    }

    clearInputFields() {
        this.refs.pool.value = "";
        this.refs.tableName.value = "";
        this.refs.tableNo.value = "";
        this.refs.bet.value = "";
        this.refs.seats.value = "";
        this.refs.tableStatus.value = "";
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

        if (dataObject.pool == "" || dataObject.tableName == ""
            || dataObject.tableNo == "" || dataObject.bet == "" || dataObject.seats == ""
            || dataObject.tableStatus == "") {
            response.error = true;
            response.errorMessage = "Please fill all details";
            return response;
        } else {
            return response;
        }
    }

}

export default CreateTableEntry

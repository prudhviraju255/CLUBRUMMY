import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export class ClubRegistratedUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clubregisterusers: [],
        }
    }



    render() {

        var rows = []

        this.state.clubregisterusers.forEach((t, sno) => {
            rows.push(
                <tr>
                    <td>{sno + 1}</td>
                    <td>{t.clubname}</td>
                    <td>{t.clubtype}</td>
                    <td>{t.clublocation}</td>
                    <td>{t.email}</td>
                    <td>{t.mobileno}</td>
                    <td>{t.username}</td>
                    <td>
                        <i className="fa fa-edit" />
                        <i className="fa fa-trash" />
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Club Players</h4>
                            <table id="datatable" className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Location</th>
                                        <th>Email</th>
                                        <th>Mobile No</th>
                                        <th>Username</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* end col */}


            </div>

        )
    }

    componentDidMount() {
        this.getAllregisteredUsers();

    }

    async getAllregisteredUsers() {
        let dataObject = {
            clubName: this.state.clubName,
            clubType: this.state.clubType,
            clubLocation: this.state.clubLocation,
            mobileno: this.state.mobileno,
            email: this.state.email,
            username: this.state.username,
            password: this.state.username,
        };
        var clubusers = await postServiceCALLS(
            ServiceUrls.CLUB_REGISTERED_USERS,
            {},
            dataObject
        );
        console.log(dataObject);
        if (clubusers.code === 400) {
            await this.setState({ error: true });
        } else if (clubusers.code === 200) {
            console.log()
            this.setState({ clubregisterusers: clubusers.data.data });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('nextProps.isUpdateUsersList', nextProps);
        if (nextProps.updateusers) {
            console.log('nextProps.isUpdateUsersList', { someState: nextProps.updateusers });
            return { someState: nextProps.updateusers };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.updateusers) {
            this.getAllregisteredUsers();
            this.props.isUpdateUsersList(false);
        }

    }

}

export default ClubRegistratedUsers

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
            updateusers: false
        }
    }



    render() {
        console.log('render', this.state.clubregisterusers);
        var rows = []

        this.state.clubregisterusers.forEach((t, sno) => {
            var clubtype = "";
            if (t.clubtype === 0) {
                clubtype = 'Bronze';
            } else if (t.clubtype === 1) {
                clubtype = 'Silver';
            } else if (t.clubtype === 2) {
                clubtype = 'Gold';
            } else if (t.clubtype === 3) {
                clubtype = 'Diamond';
            } else if (t.clubtype === 4) {
                clubtype = 'platinum';
            }
            rows.push(
                <tr>
                    <td>{sno + 1}</td>
                    <td>{t.clubname}</td>
                    <td>{clubtype}</td>
                    <td>{t.clublocation}</td>
                    <td>{t.email}</td>
                    <td>{t.mobileno}</td>
                    <td>{t.username}</td>
                    <td>
                        <i onClick={() => this.props.editUser(t)} data-toggle="modal" data-target="#exampleModal" className="fa fa-edit text-info pr-2" />
                        <i onClick={() => this.props.deleteUser(t)} data-toggle="modal" data-target="#deleteclubModal" className="fa fa-trash text-danger" />
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
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

    async componentDidMount() {
        console.log('componentDidUpdate before');
        await this.getAllregisteredUsers();
        this.props.isUpdateUsersList(false);
    }



    async getAllregisteredUsers() {
        let dataObject = {
            limit: 30,
            search_string: "",
            page: 0,
        };
        var clubusers = await postServiceCALLS(
            ServiceUrls.CLUB_REGISTERED_USERS,
            {},
            dataObject
        );
        console.log(dataObject);
        if (clubusers.code === 400) {

        } else if (clubusers.code === 200) {
            console.log(200)
            await this.setState({ clubregisterusers: clubusers.data.data });
            console.log(200, this.state.clubregisterusers);
        }
    }

    /*  static getDerivedStateFromProps(nextProps, prevState) {
          console.log('getDerivedStateFromProps nextProps.updateusers', nextProps);
          if (nextProps.updateusers) {
              console.log('nextProps.updateusers', { someState: nextProps.updateusers });
              return { someState: nextProps.updateusers };
          }
          else return null;
      }*/

    async componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate before');
        await this.getAllregisteredUsers();
        console.log('componentDidUpdate after');
        this.props.isUpdateUsersList(false);
    }


    shouldComponentUpdate(nextProps, nextState) {
        const {
            updateusers
        } = nextProps;
        const {
            updateusers: oldUpdateusers,
        } = this.props;
        console.log('shouldComponentUpdate', updateusers, oldUpdateusers);

        //  return (Prakruthi !== oldPrakruthi || Vikruthi !== oldVikruthi || Frequency !== oldFrequency || FrequencyFrom !== oldFrequencyFrom || FrequencyTo !== oldFrequencyTo || Comments !== oldComments);
        return (updateusers != oldUpdateusers);
    }

}

export default ClubRegistratedUsers

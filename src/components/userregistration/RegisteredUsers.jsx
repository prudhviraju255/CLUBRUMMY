import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import DataTable from '../utils/DataTable'
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';


const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export class RegisteredUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerusers: [],
            updateusers: false
        }
    }



    render() {
        console.log('render', this.state.registerusers);
        var rows = []
        var columnNames = ["Sno", "FirstName", "LastName", "Ëmail", "MobileNumber", "UserName", "Actions"];
        this.state.registerusers.forEach((t, sno) => {
            rows.push(
                <tr>
                    <td>{sno + 1}</td>
                    <td>{t.firstname}</td>
                    <td>{t.lastname}</td>
                    <td>{t.email}</td>
                    <td>{t.mobileno}</td>
                    <td>{t.username}</td>
                    <td>
                        <i onClick={() => this.props.editUser(t)} data-toggle="modal" data-target="#exampleModal" className="fa fa-edit" />
                        <i onClick={() => this.props.deleteUser(t)} data-toggle="modal" data-target="#deleteclubModal" className="fa fa-trash" />
                    </td>
                </tr>
            );
        });

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Club Players</h4>

                                <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
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

            </>

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
            ServiceUrls.USERS_LIST,
            {},
            dataObject
        );
        console.log(dataObject);
        if (clubusers.code === 400) {

        } else if (clubusers.code === 200) {
            console.log(200)
            await this.setState({ registerusers: clubusers.data.data ? clubusers.data.data : [] });
            console.log(200, this.state.registerusers);
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

export default RegisteredUsers

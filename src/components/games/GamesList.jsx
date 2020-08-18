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
            clubableslist: [],
            updateusers: false
        }
    }



    render() {
        console.log('render', this.state.clubableslist);
        var rows = []

        this.state.clubableslist.forEach((t, sno) => {
            var gamestatus = "";
            if (t.tableStatus === 0) {
                gamestatus = <button type="button" class="btn btn-success">Active</button>;
            } else if (t.tableStatus === 1) {
                gamestatus = <button type="button" class="btn btn-danger">Stop</button>;
            }
            rows.push(
                <tr>
                    <td>{sno + 1}</td>
                    <td>{t.tableName}</td>
                    <td>{t.tableNo}</td>
                    <td>{t.bet}</td>
                    <td>{gamestatus}</td>
                    <td>
                        <i onClick={() => this.props.editUser(t)} data-toggle="modal" data-target="#exampleModal" className="fa fa-edit" />
                        <i onClick={() => this.props.deleteUser(t)} data-toggle="modal" data-target="#deleteclubModal" className="fa fa-trash" />
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Games</h4>
                            <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>tableName</th>
                                        <th>tableNo</th>
                                        <th>bet</th>
                                        <th>tableStatus</th>
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
            clubId: "5f310e4145d54715a0c5e4f3"
        };
        var tablelist = await postServiceCALLS(
            ServiceUrls.TABLE_LIST,
            {},
            dataObject
        );
        console.log(dataObject);
        if (tablelist.code === 400) {

        } else if (tablelist.code === 200) {
            console.log(200)
            await this.setState({ clubableslist: tablelist.data });
            console.log(200, this.state.clubableslist);
        }
    }



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

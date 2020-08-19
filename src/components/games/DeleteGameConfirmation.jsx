import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import ClubRegistratedUsers from './GamesList';
import Constants from '../helpers/Constans';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


export class DeleteClubConfirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: "",
            clubName: "",
            errorMessage: ""
        }
    }

    componentDidMount() {


    }

    render() {
        return (
            <div className="modal" id="deleteclubModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.errorMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.deleteclubuser()}>Delete Club</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    async deleteclubuser() {
        if (this.state.username == "" || this.state.password == "") {
            this.setState({ error: true })
            return false;
        }
        let dataObject = {
            id: this.state._id,
        };
        var deleteclubtable = await postServiceCALLS(
            ServiceUrls.DELETE_TABLE,
            {},
            dataObject
        );
        console.log(dataObject);
        if (deleteclubtable.code === 400) {
            await this.setState({ error: true, errorMessage: deleteclubtable.message });
        } else if (deleteclubtable.code === 200) {
            window.$('#deleteclubModal').modal('hide');
            this.props.isUpdateUsersList(true);

        }
    }





    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            deleted_user: nextProps.deleted_user,
        };
    }

    componentDidUpdate(nextProps) {
        const { deleted_user } = this.props
        console.log('componentDidUpdate', deleted_user, nextProps)
        if (nextProps.deleted_user._id !== deleted_user._id) {
            this.setState({
                clubName: deleted_user.tableName,
                _id: deleted_user._id,
                errorMessage: "Do you want to delete Table: " + deleted_user.tableName
            })
        }
    }



}

export default DeleteClubConfirmation

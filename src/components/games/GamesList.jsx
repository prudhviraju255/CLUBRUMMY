import React, { Component } from 'react'
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { getClubTables } from '../redux/actions/ClubPlayersRegistrationActions';
import { connect } from 'react-redux';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export class GamesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerusers: [],
            updateusers: false,
            selectedPage: 0,
            itemCountperPage: 10,
            search: ""
        }
    }

    columndata(t, rowdata_names) {
        var allrowdata = []
        rowdata_names.forEach((fields, sno) => {
            allrowdata.push(<td>{t[fields]}</td>)
        })
        return allrowdata;
    }
    calculatePagecount() {

    }

    pagination(datalenght) {
        var pagecount = datalenght / this.state.itemCountperPage;
        pagecount = Math.ceil(pagecount);
        const noofpages = Array.from(Array(pagecount).keys());
        var pagination = [];

        pagination.push(<li onClick={(() => this.previousPage(pagecount))} className="page-item"><a className="page-link">Previous</a></li>)
        noofpages.forEach((t, i) => {
            // var selectedcondition = (this.state.selectedPage === i ? "active" : null);
            // i = i + 1;
            var selectedcondition = "page-item " + (this.state.selectedPage === i ? 'active' : '');

            pagination.push(
                <li onClick={(() => this.selectePage(i))} className={selectedcondition}><a className="page-link">{i + 1}</a></li>
            )
        })
        pagination.push(<li onClick={(() => this.nextPage(pagecount))} className="page-item"><a className="page-link">Next</a></li>)
        return pagination;
    }



    render() {
        const { clubs } = this.props;
        var rows = [];
        var data = clubs.data ? clubs.data : [];
        var totalrows = clubs.total_record ? clubs.total_record : 0;

        data.forEach((t, sno) => {

            rows.push(
                <tr>
                    <td>{sno + 1}</td>
                    <td>{t.tableName}</td>
                    <td>{t.tableNo}</td>
                    <td>{t.bet}</td>
                    <td>
                        <i onClick={() => this.props.editUser(t)} className="fa fa-edit pr-2 text-info" />
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
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <div class="dataTables_length bs-select" id="dtBasicExample_length">
                                        <label>Show
                                            <select name="dtBasicExample_length" aria-controls="dtBasicExample" name="itemCountperPage" onChange={this.handleChange} id="itemCountperPage" class="custom-select custom-select-sm form-control form-control-sm">
                                                <option value="10" selected={this.state.itemCountperPage == 10}>10</option>
                                                <option value="25" selected={this.state.itemCountperPage == 25}>25</option>
                                                <option value="50" selected={this.state.itemCountperPage == 50}>50</option>
                                                <option value="100" selected={this.state.itemCountperPage == 100}>100</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div id="dtBasicExample_filter" class="dataTables_filter"><label>Search:<input type="search" name="search" onChange={this.handleChange} id="search" class="form-control form-control-sm" placeholder="" aria-controls="dtBasicExample" /></label></div>
                                </div>
                            </div>

                            <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>tableName</th>
                                        <th>tableNo</th>
                                        <th>bet</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>

                            <div className="mt-3">
                                <ul className="pagination pagination-rounded justify-content-center mb-0">

                                    {totalrows && totalrows > 0 ? this.pagination(totalrows) : null}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                {/* end col */}
            </div>
        )
    }

    async componentDidMount() {
        const user = getCacheObject(SESSION_KEY_NAME);
        let dataObject = { limit: this.state.itemCountperPage, search_string: this.state.search, page: this.state.selectedPage, clubId: user._id };
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        }
        this.props.getClubs(dataObject, headers);
    }

    handleChange = (e) => {
        const { user } = this.props;
        var dataObject = null;

        if (e.target.name == 'itemCountperPage') {
            dataObject = { limit: parseInt(e.target.value), search_string: this.state.search, page: 0, clubId: user._id };
        } else if (e.target.name == 'search') {
            dataObject = { limit: parseInt(this.state.itemCountperPage), search_string: e.target.value, page: (this.state.selectedPage), clubId: user._id };
        }
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        }
        this.setState({ [e.target.name]: e.target.value, selectedPage: 0 });
        if (dataObject) {
            console.log('dataObject>>>>>', dataObject, user)
            this.props.getClubs(dataObject, headers);
        }


    }

    previousPage(totalcount) {
        const { user } = this.props;
        if (this.state.selectedPage > 0) {
            let dataObject = { limit: parseInt(this.state.itemCountperPage), search_string: this.state.search, page: (this.state.selectedPage - 1), clubId: user._id };
            this.setState({ selectedPage: this.state.selectedPage - 1 })
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            }
            this.props.getClubs(dataObject, headers);


        }
    }

    nextPage(totalcount) {
        const { user } = this.props;
        if ((this.state.selectedPage + 1) < totalcount) {
            let dataObject = { limit: parseInt(this.state.itemCountperPage), search_string: this.state.search, page: (this.state.selectedPage + 1), clubId: user._id };
            this.setState({ selectedPage: this.state.selectedPage + 1 })
            const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            }
            this.props.getClubs(dataObject, headers);

        }
    }

    selectePage(pgno) {
        const { user } = this.props;
        this.setState({ selectedPage: pgno });
        let dataObject = { limit: parseInt(this.state.itemCountperPage), search_string: this.state.search, page: pgno, clubId: user._id };
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        }
        this.props.getClubs(dataObject, headers);
    }


    async componentDidUpdate(prevProps, prevState) {
        // check whether client has changed
        if (prevProps.isupdateClubs !== this.props.isupdateClubs) {
            if (this.props.isupdateClubs) {
                const { user } = this.props;
                let dataObject = { limit: parseInt(this.state.itemCountperPage), search_string: "", page: 0, clubId: user._id };
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                }
                this.props.getClubs(dataObject, headers);
            }
        }
    }
}

const mapStateToProps = state => {
    const { error, loading, clubs, isupdateClubs } = state.clubsInfo;
    const { user } = state.auth;
    return {
        clubs,
        user,
        isupdateClubs
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getClubs: (input, headers) => {
            dispatch(getClubTables(input, headers));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
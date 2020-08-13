import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import ServiceUrls from '../helpers/ServiceUrls';
import config from '../../config';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

export class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerusers: [],
            updateusers: false,
            selectedPage: 1,
            itemCountperPage: 10
        }
    }

    columndata(t, rowdata_names) {
        var allrowdata = []
        rowdata_names.forEach((fields, sno) => {
            allrowdata.push(<td>{t[fields]}</td>)
        })
        return allrowdata;
    }

    pagination() {
        var datalenght = 15
        var noofpages = datalenght / 10;
        noofpages = Math.ceil(noofpages);
        var pagination = [];
        pagination.push(<li class="paginate_button page-item previous disabled" id="dtBasicExample_previous"><a href="#" aria-controls="dtBasicExample" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>)
        for (var i = 1; i <= noofpages; i++) {
            var selectedcondition = (this.state.selectedPage == i ? "active" : null);
            pagination.push(
                <li class="paginate_button page-item"><a aria-controls="dtBasicExample" data-dt-idx="1" tabindex="0" class="page-link">{i}</a></li>
            )
        }
        pagination.push(<li class="paginate_button page-item next" id="dtBasicExample_next"><a href="#" aria-controls="dtBasicExample" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li>)

        return pagination;
    }

    render() {
        console.log('datatable', this.props.data);
        var rows = [];
        var columns_th = [];
        var actions_th = [];
        var columnNames = this.props.columnNames;
        var data = this.props.data;
        var rowdata_names = ["firstname", "firstname", "firstname", "firstname", "firstname", "firstname"];
        var actionsNames = ["edit", "delete"];
        var paginationUI = this.pagination;

        data.forEach((t, s) => {
            rows.push(<tr>
                {this.columndata(t, rowdata_names)}
                <td>
                    <i onClick={() => this.props.edit(t)} data-toggle="modal" data-target="#editModal" className="fa fa-edit" />
                    <i onClick={() => this.props.delete(t)} data-toggle="modal" data-target="#deleteModal" className="fa fa-trash" />
                </td>
            </tr>)
        });
        /*     data.forEach((t, sno) => {
                 rows.push(
                     <tr>
                         <td>{t[rowdata_names[sno]]}</td>
                         <td>
                             <i onClick={() => this.props.edit(t)} data-toggle="modal" data-target="#editModal" className="fa fa-edit" />
                             <i onClick={() => this.props.delete(t)} data-toggle="modal" data-target="#deleteModal" className="fa fa-trash" />
                         </td>
                     </tr>
                 );
             }); */

        columnNames.forEach((t, sno) => {
            columns_th.push(
                <th>{t}</th>
            );
        });
        //    var actions = actionsNames.length > 0 ? <th>Actions</th> : null;



        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Club Players</h4>
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <div class="dataTables_length bs-select" id="dtBasicExample_length">
                                        <label>Show
                                            <select name="dtBasicExample_length" aria-controls="dtBasicExample" class="custom-select custom-select-sm form-control form-control-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div id="dtBasicExample_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="dtBasicExample" /></label></div>
                                </div>
                            </div>

                            <table className="table table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                <thead>
                                    <tr>
                                        {columns_th}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>

                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                    <div class="dataTables_info" id="dtBasicExample_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                </div><div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers" id="dtBasicExample_paginate">
                                        <ul class="pagination">
                                            {this.pagination()}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* end col */}
            </div>
        )
    }

    async componentDidMount() {
        console.log('componentDidUpdate before');
    }






}

export default DataTable

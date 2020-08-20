import React, { Component } from 'react'
import Header from '../dashboard/Header'
import Footer from '../dashboard/Footer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import CreateTableEntry from './CreateTableEntry'
import Constants from '../helpers/Constans';
const ACTION_STATUS = Constants.ACTION_STATUS;


export class TableEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {


  }

  render() {
    return (
      <div className="container-fluid">
        <ToastContainer />
        {/* Begin page */}
        <div id="layout-wrapper">
          <Header />

          {/* Start right Content here */}
          {/* ============================================================== */}
          <div className="main-content">
            <div className="page-content">
              {/* start page title */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="page-title mb-0 font-size-18">Club Registration</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}

              <CreateTableEntry />
            </div>
            {/* End Page-content */}
            <Footer />
          </div>
          {/* end main content*/}
        </div>
        {/* END layout-wrapper */}
      </div>
    )
  }


}

export default TableEntry

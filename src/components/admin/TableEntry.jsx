import React, { Component } from 'react'
import { Header } from '../dashboard/Header'
import Footer from '../dashboard/Footer'
import DeleteClubConfirmation from '../registration/DeleteClubConfirmation'
import UpdateClubRegisterUser from '../registration/UpdateClubRegisterUser'
import CreateClubRegisterUser from '../registration/CreateClubRegisterUser'
import ClubRegistratedUsers from '../registration/ClubRegisteredUsers'

export class TableEntry extends Component {
constructor(props){
    super(props)
    this.state={
          
    }
}

componentDidMount() {


}

    render() {
        return (
            <div className="container-fluid">
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
                    <h4 className="page-title mb-0 font-size-18">Table Entry</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="card box-big-shadow">
                        <h4 className="card-header mt-0">Table Details</h4>
                        <div className="card-body">
                            <form className="repeater" encType="multipart/form-data">
                                <div data-repeater-list="group-a">
                                    {/* <div data-repeater-item className="row"> */}
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Pools</label>
                                            <select className="form-control" ref="clubType" name="clubType"  id="clubType" >
                                                <option>-- Select --</option>
                                                <option value='1'>101 pools</option>
                                                <option value='2'>201 pools</option>
                                            </select>

                                        </div>
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Table Name</label>
                                            <input type="text" placeholder="Enter Table Name" id="clubLocation" ref="clubLocation" name="clubLocation" className="form-control" />
                                        </div>
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="subject">Table Number</label>
                                            <input type="number" placeholder="Enter Table Number" id="mobileno" ref="mobileno" name="mobileno" className="form-control removeSpinner" />
                                        </div>
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="email">Bet/Entry</label>
                                            <input type="email" placeholder="Enter Bet" id="email" ref="email" name="email"  className="form-control" />
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Sitting Capacity</label>
                                            <select className="form-control" ref="clubType" name="clubType"  id="clubType" >
                                                <option>-- Select --</option>
                                                <option value='1'>2 Seats</option>
                                                <option value='2'>6 Seats</option>
                                            </select>

                                        </div>
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Table Status</label>
                                            <select className="form-control" ref="clubType" name="clubType"  id="clubType" >
                                                <option>-- Select --</option>
                                                <option value='1'>Stop</option>
                                                <option value='2'>Live</option>
                                            </select>

                                        </div>
                                        <div className="col-lg-2 align-self-center">
                                            <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" >Submit</button>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </form>
                            {/* <p>{this.state.errorMessage}</p> */}
                        </div>
                    </div>
              
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

import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

export class ClubPlayers extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidMount(){

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
                    <h4 className="page-title mb-0 font-size-18">Dashboard</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to ClubRummy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-12">
                  <div className="card box-big-shadow">
                    <h4 className="card-header mt-0">Add New Player</h4>
                    <div className="card-body">
                      <form className="repeater" encType="multipart/form-data">
                        <div data-repeater-list="group-a">
                          <div data-repeater-item className="row">
                            <div className="form-group col-lg-2">
                              <label htmlFor="name">Name</label>
                              <input type="text" id="name" name="untyped-input" className="form-control" />
                            </div>
                            <div className="form-group col-lg-2">
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" className="form-control" />
                            </div>
                            <div className="form-group col-lg-2">
                              <label htmlFor="subject">Mobile</label>
                              <input type="text" id="subject" className="form-control" />
                            </div>
                            <div className="form-group col-lg-2">
                              <label htmlFor="subject">Username</label>
                              <input type="text" id="subject" className="form-control" />
                            </div>
                            <div className="col-lg-2 align-self-center">
                              <input data-repeater-delete type="button" className="btn btn-primary btn-block" defaultValue="Delete" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
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
                            <th>Date</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Play Chips</th>
                            <th>Real Chips</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Syta</td>
                            <td>08/02/2020</td>
                            <td>+91 9703636209</td>
                            <td>email@gmail.com</td>
                            <td>kpavan20</td>
                            <td>240</td>
                            <td>200</td>
                            <td>
                              <i className="fa fa-edit" />
                              <i className="fa fa-trash" />
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Syta</td>
                            <td>08/02/2020</td>
                            <td>+91 9703636209</td>
                            <td>email@gmail.com</td>
                            <td>kpavan20</td>
                            <td>240</td>
                            <td>200</td>
                            <td>
                              <i className="fa fa-edit" />
                              <i className="fa fa-trash" />
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Syta</td>
                            <td>08/02/2020</td>
                            <td>+91 9703636209</td>
                            <td>email@gmail.com</td>
                            <td>kpavan20</td>
                            <td>240</td>
                            <td>200</td>
                            <td>
                              <i className="fa fa-edit" />
                              <i className="fa fa-trash" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* end col */}
              </div>
              {/* end row */}
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

export default ClubPlayers

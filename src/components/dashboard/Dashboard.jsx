import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import {
    postServiceCALLS,
    getServiceCALLS,
} from "../serviceCalls/ServiceCalls";

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    render() {
        return (
            <div>
                <div className="container-fluid">

                    <div id="layout-wrapper">
                        <Header />
                       
{/* dashboard main content */}
                        <div className="main-content">
                            <div className="page-content">

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

                                <div>
        <div className="row">
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="avatar-sm font-size-20 mr-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-account-multiple-outline" />
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="font-size-16 mt-2">Total Users</div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-7">
                    <h4 className="mt-4">2,456</h4>
                  </div>
                  <div className="col-5">
                    <p className="mb-0 pt-3"><span className="text-success mr-2"> 0.16% <i className="mdi mdi-arrow-up" /> </span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="avatar-sm font-size-20 mr-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-account-multiple-outline" />
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="font-size-16 mt-2">Games Played</div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-7">
                    <h4 className="mt-4">2,456</h4>
                  </div>
                  <div className="col-5">
                    <p className="mb-0 pt-3"><span className="text-success mr-2"> 0.16% <i className="mdi mdi-arrow-up" /> </span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="avatar-sm font-size-20 mr-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-account-multiple-outline" />
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="font-size-16 mt-2">Today Games</div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-7">
                    <h4 className="mt-4">2,456</h4>
                  </div>
                  <div className="col-5">
                    <p className="mb-0 pt-3"><span className="text-success mr-2"> 0.16% <i className="mdi mdi-arrow-up" /> </span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="media">
                  <div className="avatar-sm font-size-20 mr-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-account-multiple-outline" />
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="font-size-16 mt-2">Chips Purchaced</div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-7">
                    <h4 className="mt-4">2,456</h4>
                  </div>
                  <div className="col-5">
                    <p className="mb-0 pt-3"><span className="text-success mr-2"> 0.16% <i className="mdi mdi-arrow-up" /> </span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Users Report</h4>
                <div id="line-chart" className="apex-charts" />
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card bg-primary">
              <div className="card-body">
                <div className="text-white-50">
                  <h5 className="text-white">2400 + New Clubs</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                  <div>
                    <a href="#" className="btn btn-outline-light btn-sm">View more</a>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-8">
                    <div className="mt-4">
                      <img src="assets/images/widget-img.png" alt="" className="img-fluid mx-auto d-block" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card bg-secondary">
              <div className="card-body">
                <div className="text-white-50">
                  <h5 className="text-white">2400 + New Users</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                  <div>
                    <a href="#" className="btn btn-outline-light btn-sm">View more</a>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-8">
                    <div className="mt-4">
                      <img src="assets/images/widget-img.png" alt="" className="img-fluid mx-auto d-block" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Recent Games</h4>
                <div className="table-responsive">
                  <table className="table table-centered">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Id no.</th>
                        <th scope="col">Billing Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col" colSpan={2}>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>15/01/2020</td>
                        <td>
                          <a href="#" className="text-body font-weight-medium">#SK1235</a>
                        </td>
                        <td>Werner Berlin</td>
                        <td>$ 125</td>
                        <td><span className="badge badge-soft-success font-size-12">Paid</span></td>
                        <td><a href="#" className="btn btn-primary btn-sm">View</a></td>
                      </tr>
                      <tr>
                        <td>16/01/2020</td>
                        <td>
                          <a href="#" className="text-body font-weight-medium">#SK1236</a>
                        </td>
                        <td>Robert Jordan</td>
                        <td>$ 118</td>
                        <td><span className="badge badge-soft-danger font-size-12">Chargeback</span></td>
                        <td><a href="#" className="btn btn-primary btn-sm">View</a></td>
                      </tr>
                      <tr>
                        <td>17/01/2020</td>
                        <td>
                          <a href="#" className="text-body font-weight-medium">#SK1237</a>
                        </td>
                        <td>Daniel Finch</td>
                        <td>$ 115</td>
                        <td><span className="badge badge-soft-success font-size-12">Paid</span></td>
                        <td><a href="#" className="btn btn-primary btn-sm">View</a></td>
                      </tr>
                      <tr>
                        <td>18/01/2020</td>
                        <td>
                          <a href="#" className="text-body font-weight-medium">#SK1238</a>
                        </td>
                        <td>James Hawkins</td>
                        <td>$ 121</td>
                        <td><span className="badge badge-soft-warning font-size-12">Refund</span></td>
                        <td><a href="#" className="btn btn-primary btn-sm">View</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3">
                  <ul className="pagination pagination-rounded justify-content-center mb-0">
                    <li className="page-item">
                      <a className="page-link" href="#">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                            </div>

                            <Footer />

                        </div>
                        {/* dashboard content ends here */}

                    </div>

                </div>

                <div className="rightbar-overlay" />
            </div>
        )
    }
}

export default Dashboard
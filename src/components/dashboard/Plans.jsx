import React, { Component } from 'react'
import PlansHeader from './PlansHeader'
import Footer from './Footer'
import {
  postServiceCALLS,
  getServiceCALLS,
} from "../serviceCalls/ServiceCalls";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log("params>>>>>>>>", this.props.match.params);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">

          <div id="layout-wrapper">
            <PlansHeader />

            {/* dashboard main content */}
            <div className="main-content">
              <div className="page-content">
                <div className="py-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="text-center mb-5">
                        <h4>Choose your Pricing plan</h4>
                        <p className="text-muted">To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words If several languages coalesce</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card plan-box">
                        <div className="card-body p-4">
                          <div className="media">
                            <div className="media-body">
                              <h5>Bronz</h5>
                              <p className="text-muted"></p>
                            </div>
                            <div className="ml-3">
                              <i className="bx bx-walk h1 text-primary" />
                            </div>
                          </div>
                          <div className="py-4 mt-4 text-center bg-soft-light">
                            <h1 className="m-0"><sup><small>$</small></sup> 19/ <span className="font-size-13">2000 Chips</span></h1>
                          </div>
                          <div className="plan-features p-4 text-muted mt-2">
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />2 Game Tables</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Unlimited Players</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />No Visitors Allowed</p>
                          </div>
                          <div className="text-center">
                            <a href="" className="btn btn-primary waves-effect waves-light">Select Plan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card plan-box">
                        <div className="card-body p-4">
                          <div className="media">
                            <div className="media-body">
                              <h5>Silver</h5>
                              <p className="text-muted"></p>
                            </div>
                            <div className="ml-3">
                              <i className="bx bx-run h1 text-primary" />
                            </div>
                          </div>
                          <div className="py-4 mt-4 text-center bg-soft-light">
                            <h1 className="m-0"><sup><small>$</small></sup> 29/ <span className="font-size-13">5000 Chips</span></h1>
                          </div>
                          <div className="plan-features p-4 text-muted mt-2">
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />4 Game Tables</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Unlimited Players</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />No Visitors Allowed</p>
                          </div>
                          <div className="text-center">
                            <a href="" className="btn btn-primary waves-effect waves-light">Select Plan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card plan-box">
                        <div className="card-body p-4">
                          <div className="media">
                            <div className="media-body">
                              <h5>Gold</h5>
                              <p className="text-muted"></p>
                            </div>
                            <div className="ml-3">
                              <i className="bx bx-cycling h1 text-primary" />
                            </div>
                          </div>
                          <div className="py-4 mt-4 text-center bg-soft-light">
                            <h1 className="m-0"><sup><small>$</small></sup> 39/ <span className="font-size-13">8000 Chips</span></h1>
                          </div>
                          <div className="plan-features p-4 text-muted mt-2">
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />6 Game Tables</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Unlimited Players</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Visitors Allowed</p>

                          </div>
                          <div className="text-center">
                            <a href="" className="btn btn-primary waves-effect waves-light">Select Plan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card plan-box">
                        <div className="card-body p-4">
                          <div className="media">
                            <div className="media-body">
                              <h5>Platinum</h5>
                              <p className="text-muted"></p>
                            </div>
                            <div className="ml-3">
                              <i className="bx bx-car h1 text-primary" />
                            </div>
                          </div>
                          <div className="py-4 mt-4 text-center bg-soft-light">
                            <h1 className="m-0"><sup><small>$</small></sup> 49/ <span className="font-size-13">20000 Chips</span></h1>
                          </div>
                          <div className="plan-features p-4 text-muted mt-2">
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />8 Game Tables</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Unlimited Players</p>
                            <p><i className="mdi mdi-check-bold text-primary mr-4" />Visitors Allowed</p>
                          </div>
                          <div className="text-center">
                            <a href="" className="btn btn-primary waves-effect waves-light">Select Plan</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end row */}
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
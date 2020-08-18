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
          pool:"",
          tableName:"",
          tableNo:"",
          bet:"",
          seats:"",
          tableStatus:"",
          errors:{},
          errorStatus:false
    }
}

componentDidMount() {
}

    render() {
        console.log(this.state.tableStatus)
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

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Pools</label>
                                            <select className="form-control" ref="pool" name="pool"  id="pool" onChange={this.handleChange}>
                                                <option>-- Select --</option>
                                                <option value='1'>101 pools</option>
                                                <option value='2'>201 pools</option>
                                            </select>
                                            {this.state.errorStatus==true&&
                                            this.state.pool==""? <p className="text-danger">Please enter Pool</p> : null
                                            }
                                        </div>
                                        
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Table Name</label>
                                            <input type="text" placeholder="Enter Table Name" id="tableName" ref="tableName" name="tableName" className="form-control" onChange={this.handleChange}/>
                                            {this.state.errorStatus==true&&
                                            this.state.tableName==""? <p className="text-danger">Please enter table name</p> : null
                                            }
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="subject">Table Number</label>
                                            <input type="number" placeholder="Enter Table Number" id="tableNo" ref="tableNo" name="tableNo" onChange={this.handleChange} className="form-control removeSpinner" />
                                            {this.state.errorStatus==true&&
                                            this.state.tableNo=="" ? <p className="text-danger">Please enter table number</p> : null
                                            }
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Bet/Entry</label>
                                            <input type="text" placeholder="Enter Bet" id="bet" ref="bet" onChange={this.handleChange} name="bet"  className="form-control" />
                                            {this.state.errorStatus==true&&
                                            this.state.bet=="" ? <p className="text-danger">Please enter bet</p> : null
                                            }
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Sitting Capacity</label>
                                            <select className="form-control" ref="seats" name="seats"  id="seats" onChange={this.handleChange}>
                                                <option>-- Select --</option>
                                                <option value='1'>2 Seats</option>
                                                <option value='2'>6 Seats</option>
                                            </select>
                                            {this.state.errorStatus==true&&
                                            this.state.seats=="" ? <p className="text-danger">Please enter seats</p> : null
                                            }
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="name">Table Status</label>
                                            <select className="form-control" ref="tableStatus" name="tableStatus"  id="tableStatus" onChange={this.handleChange}>
                                                <option>-- Select --</option>
                                                <option value='1'>Stop</option>
                                                <option value='2'>Live</option>
                                            </select>
                                            {this.state.errorStatus==true&&
                                            this.state.tableStatus=="" ? <p className="text-danger">Please enter table status</p> : null
                                        }
                                        </div>
                                      
                                        <div className="col-lg-2 align-self-center">
                                            <button type="button" data-repeater-delete type="button" className="btn btn-primary btn-block" onClick={()=>this.submitTableEntry()}>Submit</button>
                                        </div>
                                </div>
                            </form>
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
   
    handleChange = (e) => {
        this.state[e.target.name] = e.target.value
        }

        async submitTableEntry(){
           await this.formValidate();
if(this.state.errorStatus==false){
    alert("service call")
}
        }

         formValidate() {
             if(this.state.pool=="" && this.state.tableName == "" && this.state.tableNo == "" && this.state.bet == "" && this.state.seats == "" && this.state.tableStatus == ""){
                this.setState({errorStatus:true})
             }
                else if (this.state.pool == "") {
                    this.setState({errorStatus:true})
                }
                
                else if (this.state.tableName == "") {
                    this.setState({errorStatus:true})

                } else if (this.state.tableNo == "") {
                    this.setState({errorStatus:true})
                }
                
                else if (this.state.bet == "") {
                    this.setState({errorStatus:true})
                }

                else if (this.state.seats == "") {
                    this.setState({errorStatus:true})
                } 

                else if (this.state.tableStatus == "") {
                    this.setState({errorStatus:true})
                } 

                else{
                    this.setState({errorStatus:false})
                }
        }    

}

export default TableEntry

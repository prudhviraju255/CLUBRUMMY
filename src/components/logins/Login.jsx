import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config';
import ServiceUrls from '../helpers/ServiceUrls';
import { postServiceCALLS } from '../serviceCalls/ServiceCalls';
import { setCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { connect } from 'react-redux';
import { loginUser, errorlogin } from '../redux/actions/LoginActions'

const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      username: "",
      password: "",
      error: false,
      redirectto: "/dashboard"
    }
    console.log("params>>>>>>>>", this.props.path);
  }

  componentDidMount() {
    let isLoggedIn = localStorage.getItem("auth");
    this.setState({ login: isLoggedIn });
    // this.refs["username"].focus();
  }

  /**
   * Function to loggin
   */
  async login() {
    if (this.state.username == "" || this.state.password == "") {
      this.props.onErrorLogin('Please Enter UserName and Password');
      return false;
    }
    let dataObject = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.onUserLogin(dataObject);

    /* var loginurl = this.loginserviceCall();
     var userLoggedInDetails = await postServiceCALLS(
       loginurl,
       {},
       dataObject
     );
     console.log(userLoggedInDetails, "userloggedindetails")
     if (userLoggedInDetails.code === 400) {
       await this.setState({ error: true });
     } else if (userLoggedInDetails.code === 200) {
       await setCacheObject(SESSION_KEY_NAME, userLoggedInDetails.data);
       this.setState({ error: false, login: true })
     } */
  }

  handleEnterKey = (e) => {
    if (e.keyCode == 13 && e.target.name == "password") {
      this.login();
    }
  }

  loginserviceCall() {
    console.log("loginpage>>>>>>", this.props.usertype, this.props.usertype === "/admin");
    if (this.props.usertype === "/superadmin") {
      return ServiceUrls.SUPER_ADMIN_LOGIN;
    } else if (this.props.usertype === "/admin") {
      return ServiceUrls.ADMIN_LOGIN;
    } else if (this.props.usertype === "/user") {
      return ServiceUrls.USER_LOGIN;
    } else {
      return "";
    }
  }

  /**
   * 
   * @param {handling login credentials} e 
   */
  handleChange = (e) => {
    this.state[e.target.name] = e.target.value
  }

  render() {
    const { loading, isUserLogIn, error } = this.props;
    /*  if (this.state.login) {
        console.log('this.state.redirectto', this.state.redirectto)
        return <Redirect to={this.state.redirectto} />
      } */
    return (
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay" />
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    {loading ? "" : <p className="text-white-50 mb-0">Sign in to continue to ClubRummy.</p>}
                    <a href="index.html" className="logo logo-admin mt-4">
                      <img src="assets/images/logo-sm-dark.png" alt="" height={30} />
                    </a>
                  </div>
                </div>
                <div className="card-body pt-5">
                  <div className="p-2">
                    <form className="form-horizontal" action="index.html">
                      {error.length > 0 ? <p className="text-danger">{error}</p> : null}
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" id="username" placeholder="Enter username" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <input type="password" className="form-control" name="password" id="userpassword" placeholder="Enter password" onChange={this.handleChange} onKeyDown={this.handleEnterKey} />
                      </div>




                      <div className="mt-3">
                        <button type="button" className="btn btn-primary btn-block waves-effect waves-light" onClick={() => this.login()}>Log In</button>
                      </div>
                      <div className="mt-4 text-center">
                        <a className="text-muted"><i className="mdi mdi-lock mr-1" /> Forgot your password?</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>Don't have an account ? <a href="pages-register.html" className="font-weight-medium text-primary"> Signup now </a> </p>
                <p>© 2020 Qovex. Crafted with <i className="mdi mdi-heart text-danger" /> by Themesbrand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }



  async componentDidUpdate(prevProps, prevState) {
    // check whether client has changed
    if (prevProps.isUserLogIn !== this.props.isUserLogIn) {
      if (this.props.isUserLogIn) {
        await setCacheObject(SESSION_KEY_NAME, this.props.user.data);
        this.props.history.push(this.state.redirectto);
      }
    }
  }



}

const mapStateToProps = state => {
  const { error, loading, user, isUserLogIn } = state.auth;
  return {
    error,
    loading,
    user,
    isUserLogIn
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogin: user => {
      dispatch(loginUser(user));
    },
    onErrorLogin: user => {
      dispatch(errorlogin(user));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);


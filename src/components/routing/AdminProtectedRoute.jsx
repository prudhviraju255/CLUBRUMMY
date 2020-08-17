import React from 'react';
import { Route, Redirect } from "react-router";
import { checkSession } from "../helpers/globalHelpers/GlobalHelperFunctions";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // check for user authentication status
  var isAuthenticated = checkSession();
  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
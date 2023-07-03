import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state?.users?.userAuth);
  return (
    <Route
      {...rest}
      render={() =>
        userLogin?.isAdmin ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/not-found" />
        )
      }
    />
  );
};

export default AdminRoute;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={
      auth.isAuthenticated() ? (
        <Element />
      ) : (
        <Navigate
          to={{
            pathname: '/signin',
            state: { from: rest.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

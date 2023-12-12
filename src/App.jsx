import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './client/core/Home';
import Users from './client/user/Users';
import SignUp from './client/user/SignUp';
import SignIn from './client/auth/SignIn';
import Profile from './client/user/Profile';
import EditProfile from './client/user/EditProfile';
import Menu from './client/core/Menu';
import PrivateRoute from './client/auth/PrivateRoute';

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
        <Route
          element={
            <PrivateRoute>
              <Route path="/user/edit/:userId" element={<EditProfile />} />
            </PrivateRoute>
          }
        />       
      </Routes>
    </>
  );
};

export default App;

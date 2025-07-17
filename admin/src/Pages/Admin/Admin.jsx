// Admin.jsx
import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Outlet />  {/* This is where AddProduct or ListProduct will render */}
    </div>
  );
};

export default Admin;

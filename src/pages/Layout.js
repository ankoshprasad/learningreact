import React from 'react';
import { Outlet, Link,IndexLink} from "react-router-dom";
// import './test.module.css'; 
 import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {  NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <header>
      <nav className="navbar navbar-expand-sm bg-white navbar-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
          <li className="nav-item">
          <NavLink  exact="true" className="nav-link logoheader mx-3" to='http://localhost:3000/' >REACT.COM
           </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  exact="true" className={(navData) => (navData.isActive ? "active nav-link mx-3" : 'nav-link mx-3')} to='/' >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={(navData) => (navData.isActive ? "active nav-link mx-3" : 'nav-link mx-3')} to='/dashbord'>Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={(navData) => (navData.isActive ? "active nav-link mx-3" : 'nav-link mx-3')} to='/datatable'>Datatable</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      </header>
      <footer>
        <div className="footer w-100 bg-footer">
          <div className="text-center p-2">Copyright @2023 Reactjs Learning and Developement</div>
        </div>
      </footer>
      <Outlet />
    </>
  )
};

export default Layout;
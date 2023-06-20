import React from 'react';
import { Outlet, Link,IndexLink} from "react-router-dom";
import './test.module.css'; 
import '../index.css'; 
import {  NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <div><h1>React Routing</h1></div>
      <nav >
        <ul>
          <li>
          <NavLink exact="true" className={(navData) => (navData.isActive ? "active" : 'none')} to='/' >Home</NavLink>
          </li>
          <li>
          <NavLink className={(navData) => (navData.isActive ? "active" : 'none')} to='/blogs'>Blogs</NavLink>
          </li>
          <li>
          <NavLink className={(navData) => (navData.isActive ? "active" : 'none')} to='/contact'>contact</NavLink>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </>
  )
};

export default Layout;
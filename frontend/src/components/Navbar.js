import React from "react";
import ReactDOM from 'react-dom';
import { Outlet, Link } from "react-router-dom";
import {EventCalendar} from "./EventCalendar.js";
// import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

export class Navbar extends React.Component{
    render(){
        return( 
        <>
        <nav>
        <div className="nav-wrapper">
          {/* <BrowserRouter>
            <Routes>
                <Route path="calendar" element={<Calendar />} />
            </Routes>
          </BrowserRouter> */}
          
          <ul id="nav-mobile" className="right">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/forum">Forum</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/contactinfo">Contact Info</Link></li>
            <li><Link to="/personnel">Personnel Management</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/timesheets">Timesheets</Link></li>
          </ul>
        </div>
      </nav>
      <Outlet />
      </>
      );
    }


}
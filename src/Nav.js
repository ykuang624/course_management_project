import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';

function Nav(){
    return (
        <div className="nav">
            <ul className="nav_links">
                <Link to="/manage_course">
                    <li className="link ">Manage Course-Section</li>
                </Link>
                &nbsp;|&nbsp;
                <Link to="manage_student">
                    <li className="link">Manage Students</li>
                </Link>   
                &nbsp;|&nbsp;
                <Link to="manage_instructor">
                    <li className="link">Manage Instructor</li>
                </Link>     
                &nbsp;|&nbsp; 
                <Link to="manage_building">
                    <li className="link">Manage Rooms</li>
                </Link> 
                &nbsp;|&nbsp; 
                <Link to="manage_time">
                    <li className="link">Manage Time</li>
                </Link>       
                &nbsp;|&nbsp; 
                <Link to="manage_days">
                    <li className="link">Manage Days</li>
                </Link>                     
            </ul>

        </div>
    );
}

export default Nav;
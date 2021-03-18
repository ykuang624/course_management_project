import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import ViewCourse from './view_course'
import AddCourse from './add_course'


function ManageCourse(){
    return (
        <div>
            <Router>
            <h3 className="sub_title">Manage Course-Section</h3>
            <ul className="sub_nav">
                <Link to="/manage_course/view_courses" className="link_href">
                    <li className="link btn btn-link text-dark">View Course</li>
                </Link>
                &nbsp;|&nbsp;
                <Link to="/manage_course/add_course" className="link_href">
                    <li className="link btn btn-link text-dark">Add Course</li>
                </Link>
            </ul>
                    <Switch>
                        <Route path="/manage_course/view_courses" component={ViewCourse} />
                        <Route path="/manage_course/add_course" component={AddCourse} />
                    </Switch>
            </Router> 
        </div>
    );
}



export default ManageCourse;
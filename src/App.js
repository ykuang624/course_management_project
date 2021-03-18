import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import ManageCourse from './manage_course'
import ManageStudent from './manage_student'
import ManageInstructor from './manage_instructor'
import axios from 'axios';
import ModifyCourse from './modify_course'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <Router>
    <div className="App">
    <p>The current time is {currentTime}.</p>
      <Link to="/">
         <h1 className="text-white bg-dark m-0 title">Random University</h1>
      </Link>

        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manage_course" component={ManageCourse} />
          <Route path="/manage_student" component={ManageStudent} />
          <Route path="/manage_instructor" component={ManageInstructor} />
        </Switch>
    </div>
    </Router> 
  );
}

function Home (){

  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}

// function ManageCourses(){
//   return(
//     <div>
//       <h2>Manage Courses</h2>
//       <BrowserRouter>
//       <div>
//         <li><Link className="App-link" to="/manage_courses/view_courses">View Courses</Link></li>
//         <li><Link className="App-link" to="/manage_courses/add_a_course">Add a Course</Link></li>   
//       </div>
//           <Switch>
//             <Route path="/manage_courses/view_courses">
//                   <ViewCourses />
//             </Route>
//             <Route path="/manage_courses/add_a_course">
//                   <AddCourse />
//             </Route>
//           </Switch>
//       </BrowserRouter>
      
//     </div>
//   )
// }

function ViewCourses(){
  return(
    <h3>View Courses</h3>
  )
}

function AddCourse(){
  return(
    <h3>Add a Course</h3>
  )
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import './App.css';
import ModifyCourse from './modify_course'
import ModifySection from './modify_section'
import DeleteCourse from './delete_course'
import DeleteSection from './delete_section'

export default class ViewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section_id : "",
            instructor_id:"",
            building_id:"",
            dept:"",
            results:""
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSection = this.handleChangeSection.bind(this);
        this.handleChangeBuildingID = this.handleChangeBuildingID.bind(this);
        this.handleChangeDept = this.handleChangeDept.bind(this);
        this.handleChangeInstructorID = this.handleChangeInstructorID.bind(this);
      }

    handleChangeSection(e){
        e.preventDefault();
        this.setState({section_id:e.target.value})
    }

    handleChangeBuildingID(e){
        e.preventDefault();
        this.setState({building_id:e.target.value})
    }

    handleChangeDept(e){
        e.preventDefault();
        this.setState({dept:e.target.value})
    }

    handleChangeInstructorID(e){
        e.preventDefault();
        this.setState({instructor_id:e.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        var dic = {
            "sections.section_id":this.state.section_id,
            "rooms.building_id": this.state.building_id,
            "dept": this.state.dept,
            "sections.instructor_id":this.state.instructor_id
        }
        const data = await fetch("/api/view_course",{
                        method: 'POST', 
                        credentials: "include",
                        body:JSON.stringify(dic)
                    });
        const courses_data = await data.json();
        this.setState({results:""})    
        this.setState({results:courses_data})      
        console.log(this.state.results)
    }



    render = () => {

        const Home =()=>{
            return(
                <div>fefe</div>
            )
        }
        const courseComponent = Object.entries(this.state.results).map(function ([mykey, course]) {
            return(
                    <Router>
                    <div className="border border-dark mt-3 mb-0 ml-5 mr-5 rounded one_course">
                        <div className="row mt-3 mb-0 ml-5 mr-5 text-left">
                            <p className="col border border-dark font-weight-bold" key={course.section_id}>{course.course_name} </p>
                            <p className="col border border-dark rounded-left" key={course.section_id}>Course ID: {course.course_id}</p>
                            <p className="col border border-dark" key={course.section_id}>Section ID: {course.section_id}</p>
                            <p className="col border border-dark" key={course.section_id}>Building_id: {course.building_id}</p>
                            <p className="col border border-dark" key={course.building_name}>Building Name: {course.building_name}</p>
                            <p className="col border border-dark" key={course.section_id}>Room: {course.room_name}</p>
                            <p className="col border border-dark" key={course.room_id}>Room ID: {course.room_id}</p>
                            <p className="col border border-dark" key={course.section_id}>Instructor: {course.instructor_lname},{course.instructor_fname}</p>
                            <p className="col border border-dark" key={course.section_id}>Instructor_ID: {course.instructor_id}</p>
                            <p className="col border border-dark" key={course.section_id}>Dept: {course.dept}</p>
                            <p className="col border border-dark" key={course.code}>Course Code: {course.code}</p>
                        </div>
                        <div className="row mt-3 mb-0 ml-5 mr-5 text-left">
                            <p className="col border border-dark" key={course.max_enrollment}>Max Enrollment: {course.max_enrollment}</p>
                            <p className="col border border-dark" key={course.open_for_registration}>Registration open? {course.open_for_registration}</p>
                            <p className="col border border-dark" key={course.year}>Year: {course.year}</p>
                            <p className="col border border-dark" key={course.quarter}>Year: {course.quarter}</p>
                            <p className="col border border-dark" key={course.time_id}>Time ID: {course.time_id}</p>
                            <p className="col border border-dark" key={course.day_id}>Day ID: {course.day_id}</p>
                        </div>
                        <p className="mt-0 mb-3 ml-5 mr-5 text-left font-italic" key={course.section_id}>Description: {course.descript}</p>
                        <div className="row ml-5 mr-5">
                            <Link className="col btn btn-primary m-2" to={`/modify_course/${course.course_id}`} >
                                Modify Course
                            </Link>
                            <Link className="col btn btn-primary m-2" to={`/modify_section/${course.section_id}`} >
                            Modify This Section
                            </Link>
                            <Link className="col btn btn-primary m-2" to={`/delete_course/${course.course_id}`} >
                            Delete Course
                            </Link>
                            <Link className="col btn btn-primary m-2" to={`/delete_section/${course.section_id}`}>
                            Delete This Section
                            </Link>
                        </div>
                    </div>
                    <Switch>
                    <Route path="/modify_course" exact component={Home} />
                    <Route path="/modify_course/:course_id" component={ModifyCourse} />
                    <Route path="/modify_section" exact component={Home} />
                    <Route path="/modify_section/:section_id" component={ModifySection} />
                    <Route path="/delete_course" exact component={Home} />
                    <Route path="/delete_course/:course_id" component={DeleteCourse} />
                    <Route path="/delete_section" exact component={Home} />
                    <Route path="/delete_section/:section_id" component={DeleteSection} />
                </Switch>
        </Router>
            )
        })




        return(

        <div>
            <h3>Course Information</h3>
            <form className="pl-5 pr-5 row">
                <div className="col">
                    Section_ID:
                    <input type="text" className="form-control"  placeholder="Section ID" id="sections.section_id" name="sections.section_id" onChange={this.handleChangeSection} value={this.state.section_id}/>
                </div>
                <div className="col">
                    Department
                    <input type="text" className="form-control" placeholder="Department" id="dept" name="dept" onChange={this.handleChangeDept} value={this.state.dept}/>
                </div>
                <div className="col">
                    Instructor_ID:
                    <input type="text" className="form-control" placeholder="Instructor ID" name="sections.instructor_id" onChange={this.handleChangeInstructorID} value={this.state.instructor_id}/>
                </div>
                <div className="col">
                    Building_ID
                    <input type="text" className="form-control" placeholder="Building ID" name="rooms.building_id" onChange={this.handleChangeBuildingID} value={this.state.building_id}/>
                </div>
       
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Search</button>
            </form>
            <div>
                {courseComponent}
            </div>
        </div>

    )};


}

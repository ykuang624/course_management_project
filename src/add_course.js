import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';

export default class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code:"",
            course_id:"",
            course_name:"",
            descript:"",
            section_id : "",
            instructor_id:"",
            building_id:"",
            dept:"",
            results:"",
            field:"",
            open_for_registration:"1",
            max_enrollment:"",
            quarter:"Spring",
            year:"",
            time_id:"",
            day_id:"",
            room_id:"",
            year:"",
            success:""

        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeDept = this.handleChangeDept.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleChangeDay = this.handleChangeDay.bind(this);
        this.handleChangeEnroll = this.handleChangeEnroll.bind(this);
        this.handleChangeIns = this.handleChangeIns.bind(this);
        this.handleChangeQuarter = this.handleChangeQuarter.bind(this);
        this.handleChangeReg = this.handleChangeReg.bind(this);
        this.handleChangeRoom = this.handleChangeRoom.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(e){
        e.preventDefault();
        this.setState({course_name:e.target.value})
    }

    handleChangeCode(e){
        e.preventDefault();
        this.setState({code:e.target.value})
    }

    handleChangeDept(e){
        e.preventDefault();
        this.setState({dept:e.target.value})
    }


    handleChangeDay(e){
        e.preventDefault();
        this.setState({day_id:e.target.value})
    }

    handleChangeEnroll(e){
        e.preventDefault();
        this.setState({max_enrollment:e.target.value})
    }

    handleChangeIns(e){
        e.preventDefault();
        this.setState({instructor_id:e.target.value})
    }

    handleChangeQuarter(e){
        e.preventDefault();
        this.setState({quarter:e.target.value})
    }
    
    handleChangeRoom(e){
        e.preventDefault();
        this.setState({room_id:e.target.value})
    }
    
    handleChangeTime(e){
        e.preventDefault();
        this.setState({time_id:e.target.value})
    }

    handleChangeYear(e){
        e.preventDefault();
        this.setState({year:e.target.value})
    }

    handleChangeDesc(e){
        e.preventDefault();
        this.setState({descript:e.target.value})
    }

    handleChangeReg(e){
        e.preventDefault();
        this.setState({open_for_registration:e.target.value})
    }
    async handleSubmit(e){

        e.preventDefault();
        // first check whether there are empty values
        console.log(this.state)

        // first check whether there are empty values
        if (this.state.code=="" || this.state.course_name=="" || this.state.dept=="" || this.state.descript=="" || this.state.room_id=="" || this.state.time_id=="" || this.state.year=="" || this.state.quarter=="" || this.state.max_enrollment=="" || this.state.open_for_registration=="" ){
            this.setState({field:"None of the fields can be empty"})
            // Send this to api
        }else{
            console.log(this.state)
            this.setState({field:""})

        var dic = {
            "courses.code":this.state.code,
            "courses.course_name": this.state.course_name,
            "courses.dept": this.state.dept,
            "courses.descript":this.state.descript,
            "max_enrollment": this.state.max_enrollment,
            "room_id": this.state.room_id,
            "day_id": this.state.day_id,
            "time_id": this.state.time_id,
            "year": this.state.year,
            "quarter":this.state.quarter,
            "quarter": this.state.quarter,
            "open_for_registration":this.state.open_for_registration
        }
        if(this.state.instructor_id != ""){
            dic["instructor_id"] = this.state.instructor_id
        }
        const data = await fetch("/api/create_course",{
            method: 'POST', 
            credentials: "include",
            body:JSON.stringify(dic)
        }).then(res => res.json()).then(data => {
            this.setState({success: data.success});
          })
        }



    }
    render(){
        return(
            <div>
                <h3>Add a Course</h3>
                <form className="pl-5 pr-5">
                    <div className="row">
                        <div className="col">
                            Course Name:
                            <input type="text" className="form-control"  placeholder="eg: Introduction to Biology"  onChange={this.handleChangeName} value={this.state.course_name} />
                        </div>
                        <div className="col">
                            Course Code:
                            <input type="text" className="form-control"  placeholder="eg: 999"  onChange={this.handleChangeCode} value={this.state.code} />
                        </div>
                        <div className="col">
                            Department:
                            <input type="text" className="form-control"  placeholder="eg: Biology"  onChange={this.handleChangeDept} value={this.state.dept} />
                        </div>
                    </div>
                    <div >
                            Description:
                            <input type="text" className="form-control"  placeholder="eg: This class teaches you how to kill a fish"  onChange={this.handleChangeDesc} value={this.state.descript} />
                    </div>
                    <h4 className="font-italic">Section Info</h4>
                    <p className="font-italic">Each course must at least have one section.</p>
                    <div className="row ">
                    <div className="col">
                            Instructor ID:
                            <input type="text" className="form-control"  placeholder="eg: 2"  onChange={this.handleChangeIns} value={this.state.instructor_id} />
                    </div>
                    <div className="col">
                            Room ID:
                            <input type="text" className="form-control"  placeholder="eg: 2"  onChange={this.handleChangeRoom} value={this.state.room_id} />
                    </div>
                    <div >
                            Day ID:
                            <input type="text" className="form-control"  placeholder="eg: 2"  onChange={this.handleChangeDay} value={this.state.day_id} />
                    </div>
                    
                    <div className="col">
                            Time ID:
                            <input type="text" className="form-control"  placeholder="eg: 3"  onChange={this.handleChangeTime} value={this.state.time_id} />
                    </div>
                    </div>
                    <div className="row align_bottom">
                    <div className="col">
                            Year:
                            <input type="text" className="form-control"  placeholder="eg: 2021"  onChange={this.handleChangeYear} value={this.state.year} />
                    </div>
                    <div className="col">
                            Quarter:
                            <select value={this.state.quarter} onChange={this.handleChangeQuarter}>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            </select>
                    </div>
                    <div className="col">
                            max_enrollment:
                            <input type="number" className="form-control"  placeholder="30"  onChange={this.handleChangeEnroll} value={this.state.max_enrollment} />
                    </div>
                    <div className="col" >
                            Open for Registration:
                            <select value={this.state.open_for_registration} onChange={this.handleChangeReg}>
                            <option value="1">1</option>
                            <option value="0">0</option>
                            </select>
                    </div>
                    </div>
                    <button className="btn mt-3 btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Create</button> 
                </form>
                <p className="text-danger">{this.state.field}</p>
                <p className="text-primary">{this.state.success}</p>
            </div>
        )
    }
}
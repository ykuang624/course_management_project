import React from 'react';
import './App.css';

export default class ModifySection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            section_id : props.match.params.section_id,
            instructor_id:"",
            open_for_registration:"1",
            max_enrollment:"",
            quarter:"Spring",
            year:"",
            time_id:"",
            day_id:"",
            room_id:"",
            success:""
        }
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

    handleChangeReg(e){
        e.preventDefault();
        this.setState({open_for_registration:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        var dic = {};
        if(this.state.instructor_id != ""){
            dic["sections.instructor_id"] = this.state.instructor_id
        }
        if(this.state.dept != ""){
            dic["dept"] = this.state.dept
        }
        if(this.state.open_for_registration != ""){
            dic["open_for_registration"] = this.state.open_for_registration
        }
        if(this.state.max_enrollment != ""){
            dic["max_enrollment"] = this.state.max_enrollment
        }
        if(this.state.quarter != ""){
            dic["quarter"] = this.state.open_for_quarter
        }
        if(this.state.year != ""){
            dic["year"] = this.state.year
        }
        if(this.state.time_id != ""){
            dic["time_id"] = this.state.time_id
        }
        if(this.state.year != ""){
            dic["open_for_registration"] = this.state.open_for_registration
        }
        if(this.state.day_id != ""){
            dic["day_id"] = this.state.day_id
        }
        if(this.state.room_id != ""){
            dic["room_id"] = this.state.room_id
        }
        dic["section_id"] = this.state.section_id
        const data = await fetch("/api/modify_section",{
            method: 'POST', 
            credentials: "include",
            body:JSON.stringify(dic)
        }).then(res => res.json()).then(data => {
            this.setState({success: data.success});
          })
        
    }
    
        render(){
            return(
                <div className="m-5 bg-light border rounded">
                <h4>Modify Section</h4>
                    <form className="pl-5 pr-5 ml-5 mr-5">
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
                    <button className="btn mt-3 btn-primary" type="submit" onClick={this.handleSubmit}>Modify</button> 
                </form>
                    <p>{this.state.success}</p>
                </div>
            )
        }
    }
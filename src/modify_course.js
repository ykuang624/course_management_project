import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';

export default class ModifyCourse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            course_id : props.match.params.course_id,
            code:"",
            course_name: "",
            dept:"",
            descript:"",
            success:""
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeDept = this.handleChangeDept.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
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
    handleChangeDesc(e){
        e.preventDefault();
        this.setState({descript:e.target.value})
    }
    async handleSubmit(e){
        e.preventDefault();
        var dic = {};
        if(this.state.code != ""){
            dic["code"] = this.state.code
        }
    
        if(this.state.course_name != ""){
            dic["course_name"] = this.state.course_name
        }
        if(this.state.dept != ""){
            dic["dept"] = this.state.dept
        }
        if(this.state.descript != ""){
            dic["descript"] = this.state.descript
        }
        dic["course_id"] = this.state.course_id
        const data = await fetch("/api/modify_course",{
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
            <h4>Modify Course</h4>
                <form className="pl-5 pr-5 ml-5 mr-5">
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
                    <button className="btn mt-3 btn-primary text-center" type="submit" onClick={this.handleSubmit}>Modify</button> 
                </form>
                <p>{this.state.success}</p>
            </div>
        )
    }
};
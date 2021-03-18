import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';

export default class DeleteSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            section_id : props.match.params.section_id,
            success:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(e){
        e.preventDefault();
        var dic = {"section_id":this.state.section_id}
        const data = await fetch("/api/delete_section",{
            method: 'POST', 
            credentials: "include",
            body:JSON.stringify(dic)
        }).then(res => res.json()).then(data => {
            this.setState({success: data.success});
          })
    }
    render(){
        return(
            <div>
            <form className="m-0">
                    <button className="btn mt-3 btn-primary" type="submit" onClick={this.handleSubmit}>Confirm: Delete</button> 
            </form>
            <p className="text-primary">{this.state.success}</p>
            </div>
        )
    }
}
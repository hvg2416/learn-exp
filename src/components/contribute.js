import React, { Component } from 'react';
import '../styles/contribute.css';
import ContributeSVG from '../assets/svgs/contribute.svg';
import SmallLoader from './smallLoader';

class Contribute extends Component {


    constructor(props){
        super(props);
        this.sendData = this.sendData.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem('jsonWebTokenforLearnX')) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/');
        }
    }

    sendData() {

        let loader = document.getElementById('contribute-btn-loader');
        loader.style.display = "block";
        let companyInput = document.getElementById("companyName");
        let jobTypeInput = document.getElementById("jobType");
        let jobRoleInput = document.getElementById("jobRole");
        let descriptionInput = document.getElementById("description");
        let companyName = companyInput.value;
        let jobType = jobTypeInput.value;
        let jobRole = jobRoleInput.value;
        let description = descriptionInput.value;

        let experience = {
            company: companyName,
            jobType: jobType,
            jobRole: jobRole,
            description: description
        };

        // let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/experiences/" + localStorage.getItem('jsonWebTokenforLearnX');

        fetch(/* corsproxyurl + */url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jsonWebTokenforLearnX')
            },
            body: JSON.stringify(experience)
        }).then(res => res.json()).then((result) => {
            alert("Success");
            loader.style.display = "none";
            companyInput.value = "";
            jobTypeInput.value = "";
            jobRoleInput.value = "";
            descriptionInput.value = "";
        }).catch((err) => {
            alert(err.message)
            loader.style.display = "none";
        });
    }

    render() {
        return (
            <>
                <div className="container-fluid contribute-header-container">
                    <div className="row contribute-header-row">
                        <div className="col-md contribute-header-col">
                            <img className="contribute-header-img" src={ContributeSVG} alt=""></img>
                        </div>
                        <div className="col-md contribute-header-col contribute-header-text-div">
                            <h1 className="contribute-header-text">Share your experiences with others around the world</h1>
                        </div>
                    </div>
                </div>
                <div className="container-fluid contribute-form-container" id="form-container">
                    <div className="row contribute-form-row">
                        <div className="col">
                            <div className="form-heading">
                                <h1>Add Experience</h1>
                            </div>
                            <form className="contribute-form">
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" placeholder="e.g. Flipkart" required></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobType">Job Type</label>
                                    <input type="text" className="form-control" id="jobType" placeholder="e.g. Internship"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobRole">Job Role</label>
                                    <input type="text" className="form-control" id="jobRole" placeholder="e.g. Software Developer"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" placeholder="Share your experience" rows="10"></textarea>
                                </div>
                                <div className="add-btn-div">
                                    <div className="add-btn" onClick={this.sendData}>
                                        <span className="add-btn-text">Add Experience</span>
                                        <div id='contribute-btn-loader'>
                                            <SmallLoader />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Contribute;
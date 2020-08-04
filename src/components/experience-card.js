import React, { Component } from 'react';
import '../styles/experienceCard.css';
import SampleLogo from '../assets/svgs/expCardLogoSample.svg';

class ExperienceCard extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-header-row">
                    <img src={SampleLogo} alt="" className="card-header-img"></img >
                </div>
                <div className="card-info">
                    <div className="card-info-col">
                        <h5>Company : </h5> <h6>{this.props.experience.company}</h6>
                    </div>
                    <div className="card-info-col">
                        <h5>Job Role: </h5> <h6>{this.props.experience.jobRole}</h6>
                    </div>
                    <div className="card-info-col">
                        <h5>Job Type: </h5> <h6>{this.props.experience.jobType}</h6>
                    </div>
                </div>
                <div className="card-desc">
                    <h5>Description</h5>
                    <p>{this.props.experience.description.slice(0, 25)}</p>
                </div>
            </div>
        );
    }
}

export default ExperienceCard;
import React, { Component } from 'react';
import '../styles/about.css';
import LearningSVG from '../assets/svgs/aboutLearning.svg';

class About extends Component {
    
    render(){
        return(
            <div className="container-fluid about-div">
                <div className="row about-row">
                    <div className="col-md about-text-div">
                        <h1 className="about-text-heading">About</h1>
                        <p className="about-text">
                            We are here with a vision of providing all possible help
                            to our lovers, so that they never regret for something saying
                            that <q>If someone told me this before</q>.
                        </p>
                    </div>
                    <div className="col-md about-learning-image-div">
                        <img className="about-learning-image" src={LearningSVG} alt=""></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
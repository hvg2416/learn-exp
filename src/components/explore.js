import React, { Component } from 'react';
import '../styles/explore.css';
import ExperienceCard from './experience-card';
import FullScreenLoader from './fullScreenLoader';

class Explore extends Component {


    constructor(props) {
        super(props);
        this.state = {
            experiences: []
        };
    }

    componentDidMount() {

        let explore_fullscreenloader = document.getElementById('explore-fullscreenloader');
        explore_fullscreenloader.style.display = 'block';
        let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let experiences_url = "https://learn-exp-server.herokuapp.com/experiences";
        fetch(corsproxyurl + experiences_url)
            .then((res) => res.json())
            .then((experiences) => {
                if (experiences.length !== 0) {
                    this.setState({
                        experiences: experiences,
                        loading: false
                    });
                }
            }).catch((err) => {
                console.log("Explore : -" + err.message)
            })
            .finally(() => {
                explore_fullscreenloader.style.display = 'none';
            });
    }

    render() {

        let allExperiences = this.state.experiences.map((experience) => {
            return (
                <div key={experience._id} className='col-md-4 explore-body-experience-card'>
                    <ExperienceCard experience={experience} />
                </div>
            );
        });

        return (
            <>
                <div id='explore-fullscreenloader'>
                    <FullScreenLoader />
                </div>
                <div className='container-fluid explore-header-div'>
                    <h1 className='explore-header-heading-text'>Let's Explore</h1>
                </div>
                <div className='container-fluid explore-body-div'>
                    {/* <div className='row' style={{ border: 'black solid 1px', height: '24vh' }}></div> */}
                    <div className='row'>
                        {allExperiences}
                    </div>
                </div>
            </>
        );
    }
}

export default Explore;
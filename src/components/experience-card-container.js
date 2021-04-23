import React, { Component } from 'react';
import '../styles/experienceCardContainer.css'
import ExperienceCard from './experience-card';
import Arrow from '../assets/svgs/arrow.svg';

class ExperienceCardContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            experiences: [{
                company: "Loading...",
                jobType: "Loading...",
                jobRole: "Loading...",
                description: "Loading..."
            }]
        };
    }

    leftArrowClicked() {
        document.getElementById('expCardMobile').style.animationName = "slideFromRight";
    }

    rightArrowClicked() {
        document.getElementById('expCardMobile').style.animationName = "slideToRight";
    }

    componentDidMount() {
//         let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/experiences";
        fetch(corsproxyurl + url)
            .then((res) => res.json())
            .then((experiences) => {
                if (experiences.length !== 0) {
                    this.setState({
                        experiences: experiences,
                        loading: false
                    });
                }
            }).catch((err) => console.log("Experience Card Container :- " + err.message));
    }

    render() {
        return (
            <div className="container-fluid exp-card-div">
                <div className="row featured-heading-div">
                    <div className="col featured-heading-col">
                        <h1 className="featured-heading-text">Featured</h1>
                    </div>
                </div>
                <div className="row featured-cards-div">
                    <div className="col featured-card-col">
                        <ExperienceCard experience={this.state.experiences[0]} />
                    </div>
                    <div className="col featured-card-col">
                        <ExperienceCard experience={this.state.experiences[0]} />
                    </div>
                    <div className="col featured-card-col">
                        <ExperienceCard experience={this.state.experiences[0]} />
                    </div>
                </div>
                <div className="featured-cards-div-mobile">
                    <div className="featured-card-col-mobile" id="expCardMobile">
                        <ExperienceCard experience={this.state.experiences[0]} />
                    </div>
                    <div className="featured-cards-slider-mobile-div">
                        <img src={Arrow} alt="" className="arrow-left arrow" onClick={this.leftArrowClicked}></img>
                        <img src={Arrow} alt="" className="arrow-right arrow" onClick={this.rightArrowClicked}></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExperienceCardContainer;

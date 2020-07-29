import React, { Component } from 'react';
import Header from '../components/header';
import StatsCounter from './statsCounter';
import ExperienceCardContainer from './experience-card-container';


class Home extends Component {

    render() {
        return (
            <>
                <Header />
                <ExperienceCardContainer />
                <StatsCounter />
            </>
        );
    }
}

export default Home;
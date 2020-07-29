import React, { Component } from 'react';
import '../styles/statsCounter.css'
import ActiveUsersSVG from '../assets/svgs/activeUsersStats.svg';
import ContributorsSVG from '../assets/svgs/contributors.svg';
import DailyVisitsSVG from '../assets/svgs/dailyVisits.svg';

var setIntervalObject;
var flag = 0;

class StatsCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeUsers: 0,
            contributors: 0,
            dailyVisits: 0,
        };
        this.setCount = this.setCount.bind(this);
        this.checkDiff = this.checkDiff.bind(this);
    }

    componentDidMount() {
        if(flag === 1){
            this.setState({
                activeUsers: 1024,
                contributors: 3224,
                dailyVisits: 7024,
            });
        }
        setIntervalObject = setInterval(this.checkDiff, 1000);
    }

    checkDiff() {
        const current_page = window.location.href.replace('http://localhost:3000', '');
        
        if (current_page === '/') {
            let elem = document.getElementById('stats');
            let pageYOffset = window.pageYOffset;
            let offsetTop = elem.offsetTop;
            let clientHeight = document.documentElement.clientHeight;
            let diff = offsetTop - pageYOffset;
            if (diff < (clientHeight / 2)) {
                setInterval(this.setCount, 1);
            }
        }
    }

    setCount() {
        if (this.state.dailyVisits >= 7024) {
            clearInterval(setIntervalObject);
            flag = 1;
        }
        else {
            if (this.state.activeUsers < 1024) {
                this.setState((state, props) => ({
                    ...state,
                    activeUsers: state.activeUsers + 2,
                    contributors: state.contributors + 2,
                    dailyVisits: state.dailyVisits + 2
                }));
            }
            else if (this.state.contributors < 3224) {
                this.setState((state, props) => ({
                    ...state,
                    contributors: state.contributors + 5,
                    dailyVisits: state.dailyVisits + 5
                }));
            }
            else {
                this.setState((state, props) => ({
                    ...state,
                    dailyVisits: state.dailyVisits + 10
                }));
            }
        }
    }

    render() {
        return (
            <div className="container-fluid stats-div" id="stats">
                <div className="row stats-row">
                    <div className="col-md stats-col stats-active-users">
                        <img src={ActiveUsersSVG} alt="" height="300px" width="300px"></img>
                        <h1>{this.state.activeUsers + "+"}</h1>
                        <h2>Active Users</h2>
                    </div>
                    <div className="col-md stats-col stats-contributors">
                        <img src={ContributorsSVG} alt="" height="300px" width="300px"></img>
                        <h1>{this.state.contributors + "+"}</h1>
                        <h2>Contributors</h2>
                    </div>
                    <div className="col-md stats-col stats-daily-visits">
                        <img src={DailyVisitsSVG} alt="" height="300px" width="300px"></img>
                        <h1>{this.state.dailyVisits + "+"}</h1>
                        <h2>Daily Visits</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatsCounter;
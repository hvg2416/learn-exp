import React, { Component } from 'react';
import '../styles/footer.css';
import Logo from '../assets/svgs/logo.svg'

class Footer extends Component{

    render(){
        return(
            <div className="container-fluid footer">
                <div className="row footer-row">
                    <div className="col-md footer-col footer-brand-logo-div">
                        <img src={Logo} alt="" className="footer-brand-logo"></img>
                        <p>Learn from Experiences</p>
                    </div>
                    <div className="col-md footer-col footer-main-div">
                        <p>Made with love by Harsh Vardhan Gautam</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
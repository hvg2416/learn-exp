import React, { Component } from 'react';
import '../styles/navbar.css';
import Logo from '../assets/svgs/logo.svg';
import { RiMenu2Line, RiCloseLine } from 'react-icons/ri';
import { GrLinkTop } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';

class Navbar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.logIn = this.logIn.bind(this);
    }

    componentDidMount() {
        setInterval(this.onScroll, 50);
        if (this.state.isLoggedIn || sessionStorage.getItem('isLoggedIn') === 'true') {
            let contributeBtn = document.getElementById('contribute-btn');
            let loginBtn = document.getElementById('login-btn');
            contributeBtn.style.display = 'block';
            loginBtn.style.display = 'none';
        }
    }

    componentDidUpdate() {
        if (this.state.isLoggedIn) {
            let contributeBtn = document.getElementById('contribute-btn');
            let loginBtn = document.getElementById('login-btn');
            contributeBtn.style.display = 'block';
            loginBtn.style.display = 'none';
        }
    }

    onScroll() {
        let navbar = document.getElementsByClassName("navbar-desktop")[0];
        let scroll2Top = document.getElementById("scrollToTop");
        let pageYOffset = window.pageYOffset;
        let clientHeight = document.documentElement.clientHeight;
        if (pageYOffset >= clientHeight / 3) {
            navbar.classList.add("navbar-desktop-onscroll");
            scroll2Top.style.fontSize = "2vw";
        } else {
            navbar.classList.remove("navbar-desktop-onscroll");
            scroll2Top.style.fontSize = "0vw";
        }
    }

    openNav() {
        document.getElementById("navMobile").style.width = "100%";
        let links = document.getElementsByClassName("navbar-mobile-link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("zero-font-size");
            links[i].classList.add("big-font-size");
        }
        let openNavBtn = document.getElementById("openNavbarMobile");
        let closeNavBtn = document.getElementById("closeNavbarMobile");
        openNavBtn.style.display = "none";
        closeNavBtn.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    closeNav() {
        document.getElementById("navMobile").style.width = "0%";
        let links = document.getElementsByClassName("navbar-mobile-link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.add("zero-font-size");
            links[i].classList.remove("big-font-size");
        }
        let closeNavBtn = document.getElementById("closeNavbarMobile");
        let openNavBtn = document.getElementById("openNavbarMobile");
        openNavBtn.style.display = "block";
        closeNavBtn.style.display = "none";
        document.body.style.overflow = "auto";
    }

    openLogInModal() {
        let modal = document.getElementById("login-modal");
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    logIn() {
        let modal = document.getElementById("login-modal");
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let loader = document.getElementsByClassName('loader-div')[0];
        loader.classList.add('loader-visible');

        let user = {
            username: username,
            password: password
        };

        let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/users/login";

        fetch(corsproxyurl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then((result) => {
            modal.style.display = "none";
            this.setState({
                ...this.state,
                isLoggedIn: true
            });
            loader.classList.remove('loader-visible');
            document.body.style.overflow = 'auto';
            sessionStorage.setItem('isLoggedIn', 'true');
            alert("Success");
        }).catch((err) => {
            loader.style.display = 'none';
            alert(err.message)
        });
    }

    signUp(){
        let loader = document.getElementsByClassName('loader-div')[1];
        loader.classList.add('loader-visible');
    }

    render() {
        return (
            <>
                <div className="navbar-desktop">
                    <div className="logo-navbar-div">
                        <Link to='/'>
                            <img src={Logo} alt="" className="logo-navbar"></img>
                        </Link>
                    </div>
                    <div className="navbar-options-div">
                        <Link to='/' className="navbar-link">Home</Link>
                        <Link to='/about' className="navbar-link">About Us</Link>
                        <Link to='/contact' className="navbar-link">Contact</Link>
                        <Link to='/contribute' className="navbar-link" id="contribute-btn">Contribute</Link>
                        <Link to='#' className="navbar-link" id="login-btn" onClick={this.openLogInModal} >Log In</Link>
                    </div>
                </div>
                <div className="navBarMobileToggleButtonDiv">
                    <RiMenu2Line onClick={this.openNav} id="openNavbarMobile" className="navbartogglebtn" />
                    <RiCloseLine onClick={this.closeNav} id="closeNavbarMobile" className="navbartogglebtn" />
                </div>
                <div className="navbar-mobile" id="navMobile">
                    <Link to='/' className="navbar-mobile-link" onClick={this.closeNav}>Home</Link>
                    <Link to='/about' className="navbar-mobile-link" onClick={this.closeNav}>About</Link>
                    <Link to='/contact' className="navbar-mobile-link" onClick={this.closeNav}>Contact</Link>
                    <Link to='/contribute' className="navbar-mobile-link" onClick={this.closeNav}>Contribute</Link>
                </div>
                <GrLinkTop id="scrollToTop" onClick={() => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    });
                }} />
                <div className='container-fluid' id="login-modal">
                    <LoginModal logIn={this.logIn} signUp={this.signUp} />
                </div>
            </>
        );
    }
}

export default Navbar;
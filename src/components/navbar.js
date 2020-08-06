import React, { Component } from 'react';
import '../styles/navbar.css';
import Logo from '../assets/svgs/logo.svg';
import { RiMenu2Line, RiCloseLine } from 'react-icons/ri';
import { GrLinkTop } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';
import FullScreenLoader from './fullScreenLoader';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loggedInUserInfo: {}
        };
        this.logIn = this.logIn.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.renewToken = this.renewToken.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        setInterval(this.onScroll, 50);

        // let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let verify_url = "https://learn-exp-server.herokuapp.com/users/verify";

        fetch(/* corsproxyurl + */verify_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('jsonWebTokenforLearnX')
            },
        }).then((res) => {
            if (res.status === 200) {

                let user_url = 'https://learn-exp-server.herokuapp.com/users/' + localStorage.getItem('jsonWebTokenforLearnX');

                fetch(/* corsproxyurl + */user_url)
                    .then(res => res.json())
                    .then((response) => {
                        this.setState({
                            ...this.state,
                            isLoggedIn: true,
                            loggedInUserInfo: response
                        });
                        this.renewToken(response.username, response.password);
                    })
                    .catch((err) => console.log(err));

            } else {
                this.setState({
                    ...this.state,
                    isLoggedIn: false
                });
            }
            document.getElementById('navbar-loader').style.display = 'none';
        }).catch((err) => {
            console.log(err.message);
            document.getElementById('navbar-loader').style.display = 'none';
        });

        if (this.state.isLoggedIn) {
            console.log('hello');
            let contributeBtnMobile = document.getElementById('contribute-btn-mobile');
            let loginBtn = document.getElementById('login-btn');
            let loginBtnMobile = document.getElementById('login-btn-mobile');
            let userProfileBtn = document.getElementById('user-profile-icon');
            userProfileBtn.style.display = 'flex';
            //contributeBtn.style.display = 'block';
            contributeBtnMobile.style.display = 'block';
            loginBtn.style.display = 'none';
            loginBtnMobile.style.display = 'none';
        }
    }

    componentDidUpdate() {
        if (this.state.isLoggedIn) {
            let contributeBtnMobile = document.getElementById('contribute-btn-mobile');
            let loginBtn = document.getElementById('login-btn');
            let logOutBtnMobile = document.getElementById('logout-btn-mobile');
            let loginBtnMobile = document.getElementById('login-btn-mobile');
            let userProfileBtn = document.getElementById('user-profile-icon');
            let userProfileBtnMobile = document.getElementById('profile-btn-mobile');
            userProfileBtn.style.display = 'flex';
            userProfileBtnMobile.style.display = 'block';
            contributeBtnMobile.style.display = 'block';
            loginBtn.style.display = 'none';
            loginBtnMobile.style.display = 'none';
            logOutBtnMobile.style.display = 'block';
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

        //This is the exact same code of "closeNav" function
        //It is written again because of some error while calling "closeNav" function here.
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

        //Now the "openLogInModal" begins from here
        let modal = document.getElementById("login-modal");
        modal.style.display = 'flex';

    }

    renewToken(username, password) {
        let user = {
            username: username,
            password: password
        };

        // let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/users/login";

        fetch(/* corsproxyurl + */url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then((result) => {
            this.setState({
                ...this.state,
                isLoggedIn: true
            });
            localStorage.setItem('jsonWebTokenforLearnX', result.token);
        }).catch((err) => {
            alert(err.message)
        });
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

        // let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/users/login";

        fetch(/* corsproxyurl + */url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then((result) => {

            modal.style.display = "none";
            loader.classList.remove('loader-visible');
            localStorage.setItem('jsonWebTokenforLearnX', result.token);
            let user_url = 'https://learn-exp-server.herokuapp.com/users/' + localStorage.getItem('jsonWebTokenforLearnX');

            fetch(/* corsproxyurl + */user_url)
                .then(res => res.json())
                .then((response) => {
                    this.setState({
                        ...this.state,
                        isLoggedIn: true,
                        loggedInUserInfo: response
                    })
                })
                .catch((err) => console.log(err));
            alert("Success");
        }).catch((err) => {
            loader.classList.remove('loader-visible');
            alert(err.message)
        });
    }

    signUp() {

        let username = document.getElementById('new-username').value;
        let password = document.getElementById('new-password').value;
        let firstname = document.getElementById('firstname').value;
        let lastname = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let loader = document.getElementsByClassName('loader-div')[1];
        loader.classList.add('loader-visible');

        let new_user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        };

        // let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = "https://learn-exp-server.herokuapp.com/users/register";

        fetch(/* corsproxyurl + */url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(new_user)
        }).then(res => res.json()).then((result) => {
            loader.classList.remove('loader-visible');
            alert("Successfully Registered !! Now, try logging in :-)");
        }).catch((err) => {
            loader.style.display = 'none';
            alert(err.message)
        });
    }

    logOut(){

        this.setState({
            ...this.state,
            isLoggedIn: false
        });
        localStorage.clear();
        window.location.replace('https://learnx.netlify.app/');
    }

    render() {
        return (
            <>
                <div id='navbar-loader'>
                    <FullScreenLoader />
                </div>
                <div className="navbar-desktop">
                    <div className="logo-navbar-div">
                        <Link to='/'>
                            <img src={Logo} alt="" className="logo-navbar"></img>
                        </Link>
                    </div>
                    <div className="navbar-options-div">
                        <Link to='/' className="navbar-link">Home</Link>
                        <Link to='/about' className="navbar-link">About Us</Link>
                        <Link to='/explore' className="navbar-link">Explore</Link>
                        <Link to='/contribute' className="navbar-link" id="contribute-btn">Contribute</Link>
                        <div className='user-profile-btn-div' id='user-profile-icon'>
                            <div className='user-profile-thumbnail-view-div'>
                                <div className='user-profile-btn-thumbnail-div'></div>
                                <span className='user-profile-btn-user-firstname'> {this.state.loggedInUserInfo.firstname} </span>
                            </div>
                            <div className='user-profile-thumbnail-hover-menu-div'>
                                <Link to='/profile' className='navbar-link user-profile-thumbnail-links'> My Profile </Link>
                                <Link to='/contribute' className='navbar-link user-profile-thumbnail-links'> Contribute </Link>
                                <Link to='#' onClick={this.logOut} className='navbar-link user-profile-thumbnail-links'> Log Out </Link>
                            </div>
                        </div>
                        <Link to='#' className="navbar-link" id="login-btn" onClick={this.openLogInModal} >Log In</Link>
                    </div>
                </div>
                <div className="navBarMobileToggleButtonDiv">
                    <RiMenu2Line onClick={this.openNav} id="openNavbarMobile" className="navbartogglebtn" />
                    <RiCloseLine onClick={this.closeNav} id="closeNavbarMobile" className="navbartogglebtn" />
                </div>
                <div className="navbar-mobile" id="navMobile">
                    <Link to='/profile' className="navbar-mobile-link" id='profile-btn-mobile' onClick={this.closeNav}>My Profile</Link>
                    <Link to='/' className="navbar-mobile-link" onClick={this.closeNav}>Home</Link>
                    <Link to='/about' className="navbar-mobile-link" onClick={this.closeNav}>About</Link>
                    <Link to='/contact' className="navbar-mobile-link" onClick={this.closeNav}>Contact</Link>
                    <Link to='/contribute' className="navbar-mobile-link" onClick={this.closeNav} id='contribute-btn-mobile'>Contribute</Link>
                    <Link to='#' className="navbar-mobile-link" id="login-btn-mobile" onClick={this.openLogInModal} >Log In</Link>
                    <Link to='#' className="navbar-mobile-link" id="logout-btn-mobile" onClick={this.logOut} >Log Out</Link>
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
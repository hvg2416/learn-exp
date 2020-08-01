import React, { Component } from 'react';
import '../styles/loginModal.css';
import LoginSVG from '../assets/svgs/login.svg';
import Loader from './loader';
import { FiX } from "react-icons/fi";

class LoginModal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoginWindowOpened: true,
            isSignUpWindowOpened: false
        };
        this.openLoginWindow = this.openLoginWindow.bind(this);
        this.openSignUpWindow = this.openSignUpWindow.bind(this);
    }

    componentDidMount() {
        let loginBtn = document.getElementById('login-modal-btn');
        let signUpBtn = document.getElementById('signup-modal-btn');
        let loginModal = document.getElementById('login-modal-body');
        let signUpModal = document.getElementById('signup-modal-body');
        if (this.state.isLoginWindowOpened) {
            loginBtn.style.borderBottom = 'teal solid 2px';
            signUpBtn.style.borderBottom = 'none';
            loginModal.style.display = 'flex';
            signUpModal.style.display = 'none';
        }
        if (this.state.isSignUpWindowOpened) {
            loginBtn.style.borderBottom = 'none';
            signUpBtn.style.borderBottom = 'teal solid 2px';
            loginModal.style.display = 'none';
            signUpModal.style.display = 'flex';
        }
    }

    componentDidUpdate() {
        let loginBtn = document.getElementById('login-modal-btn');
        let signUpBtn = document.getElementById('signup-modal-btn');
        let loginModal = document.getElementById('login-modal-body');
        let signUpModal = document.getElementById('signup-modal-body');
        if (this.state.isLoginWindowOpened) {
            loginBtn.style.borderBottom = 'teal solid 2px';
            signUpBtn.style.borderBottom = 'none';
            loginModal.style.display = 'flex';
            signUpModal.style.display = 'none';
        }
        if (this.state.isSignUpWindowOpened) {
            loginBtn.style.borderBottom = 'none';
            signUpBtn.style.borderBottom = 'teal solid 2px';
            loginModal.style.display = 'none';
            signUpModal.style.display = 'flex';
        }
    }

    closeLogInModal() {
        let modal = document.getElementById("login-modal");
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    openLoginWindow() {
        if (!this.state.isLoginWindowOpened) {
            this.setState({
                ...this.state,
                isLoginWindowOpened: true,
                isSignUpWindowOpened: false
            });
        }
    }

    openSignUpWindow() {
        if (!this.state.isSignUpWindowOpened) {
            this.setState({
                ...this.state,
                isSignUpWindowOpened: true,
                isLoginWindowOpened: false
            });
        }
    }

    render() {
        return (
            <>
                <div className="row login-modal-close-btn-div">
                    <FiX onClick={this.closeLogInModal} className='close-modal-btn' />
                </div>
                <div className="row login-modal-body">
                    <div className='col-md login-modal-body-img-div'>
                        <img src={LoginSVG} alt="" className="login-modal-body-img"></img>
                    </div>
                    <div className='col-md login-modal-body-form-div'>
                        <div className='row login-modal-body-form-header-row'>
                            <div className='login-modal-body-form-header-btn-div' id='login-modal-btn' onClick={this.openLoginWindow}>
                                <span>Log In</span>
                            </div>
                            <div className='login-modal-body-form-header-btn-div' id='signup-modal-btn' onClick={this.openSignUpWindow}>
                                <span>Sign Up</span>
                            </div>
                        </div>
                        <div className='row login-modal-body-form-body-row' id='login-modal-body'>
                            <div className='login-modal-body-form-body-heading-div'>
                                <h1>Sign In</h1>
                                <small>Sign In to continue to the application</small>
                            </div>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input className='form-control input-field' type='text' id='username'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input className='form-control input-field' type='password' id='password'></input>
                                </div>
                            </form>
                            <div className='login-modal-body-form-body-login-btn-div' onClick={this.props.logIn}>
                                <span>Sign In</span>
                                <Loader />
                            </div>
                        </div>
                        <div className='row signup-modal-body-form-body-row' id='signup-modal-body'>
                            <div className='signup-modal-body-form-body-heading-div'>
                                <h1>Sign Up</h1>
                                <small>Sign Up to continue to the application</small>
                            </div>
                            <form>
                                <div className='signup-modal-body-name-div'>
                                    <div className='form-group'>
                                        <label htmlFor='firstname'>First Name</label>
                                        <input className='form-control name-input input-field' type='text' id='firstname'></input>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='lastname'>Last Name</label>
                                        <input className='form-control name-input input-field' type='text' id='lastname'></input>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input className='form-control input-field' type='email' id='email'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input className='form-control input-field' type='text' id='new-username'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input className='form-control input-field' type='password' id='new-password'></input>
                                </div>
                            </form>
                            <div className='signup-modal-body-form-body-register-btn-div' onClick={this.props.signUp}>
                                <span>Register</span>
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginModal;
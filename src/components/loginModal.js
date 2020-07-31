import React, { Component } from 'react';
import '../styles/loginModal.css';
import LoginSVG from '../assets/svgs/login.svg';
import Loader from './loader';

class LoginModal extends Component {


    closeLogInModal() {
        let modal = document.getElementById("login-modal");
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    render() {
        return (
            <>
                <div className="row login-modal-close-btn-div">
                    <button onClick={this.closeLogInModal} className='btn btn-info'>Close Modal</button>
                </div>
                <div className="row login-modal-body">
                    <div className='col-md login-modal-body-img-div'>
                        <img src={LoginSVG} alt="" className="login-modal-body-img"></img>
                    </div>
                    <div className='col-md login-modal-body-form-div'>
                        <div className='row login-modal-body-form-header-row'>

                        </div>
                        <div className='row login-modal-body-form-body-row'>
                            <div className='login-modal-body-form-body-heading-div'>
                                <h1>Sign In</h1>
                                <small>Sign In to continue to the application</small>
                            </div>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input className='form-control' type='text' id='username'></input>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input className='form-control' type='password' id='password'></input>
                                </div>
                            </form>
                            <div className='login-modal-body-form-body-login-btn-div' onClick={this.props.logIn}>
                                <span>Sign In</span>
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
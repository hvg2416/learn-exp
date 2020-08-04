import React, { Component } from 'react';
import '../styles/userProfile.css';
import FullScreenLoader from './fullScreenLoader';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }

    componentDidMount() {

        if (!localStorage.getItem('jsonWebTokenforLearnX')) {
            localStorage.clear();
            window.location.replace('http://localhost:3000/');
        } else {
            let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
            let user_profile_url = 'https://learn-exp-server.herokuapp.com/users/' + localStorage.getItem('jsonWebTokenforLearnX');
            let profile_screen_loader = document.getElementById('profile-screen-loader');

            fetch(corsproxyurl + user_profile_url)
                .then(res => res.json())
                .then((user_info) => {
                    this.setState({
                        ...this.state,
                        userInfo: user_info
                    });
                    profile_screen_loader.style.display = 'none';
                })
                .catch((err) => {
                    console.log(err)
                    profile_screen_loader.style.display = 'none';
                });
        }
    }

    render() {

        return (
            <>
                <div id='profile-screen-loader'>
                    <FullScreenLoader />
                </div>
                <div className='container-fluid user-profile-container-fluid-div'>
                    <div className='container user-profile-container-div'>
                        <div className='row user-profile-left-menu-div'></div>
                        <div className='row user-profile-main-div'>
                            <div className='col user-profile-main-div-header-div'>
                                <div className='user-profile-main-header-user-bio-div'>
                                    <div className='user-profile-main-header-user-picture-div'></div>
                                    <span className='user-profile-main-header-user-full-name'> {`${this.state.userInfo.firstname} ${this.state.userInfo.lastname}`} </span>
                                </div>
                            </div>
                            <div className='col user-profile-main-div-user-info-div'>
                                <form>
                                    <div className='form-group user-profile-info-div'>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-firstname'>First Name</label>
                                            <input value={this.state.userInfo.firstname} type='text' className='form-control user-profile-input-field' id='user-firstname' disabled></input>
                                        </div>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-lastname'>Last Name</label>
                                            <input value={this.state.userInfo.lastname} type='text' className='form-control user-profile-input-field' id='user-lastname' disabled></input>
                                        </div>
                                    </div>
                                    <div className='form-group user-profile-info-div'>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-email'>Email</label>
                                            <input value={this.state.userInfo.email} type='text' className='form-control user-profile-input-field' id='user-email' disabled></input>
                                        </div>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-username'>Username</label>
                                            <input value={this.state.userInfo.username} type='text' className='form-control user-profile-input-field' id='user-username' disabled></input>
                                        </div>
                                    </div>
                                    <div className='user-profile-form-edit-and-save-btn-div'>
                                        <div className='user-profile-form-edit-btn-div'>
                                            <div className='user-profile-form-edit-and-save-btn' id='user-profile-form-edit-btn'>Edit Info</div>
                                        </div>
                                        <div className='user-profile-form-save-btn-div'>
                                            <div className='user-profile-form-edit-and-save-btn' id='user-profile-form-save-btn'>Save</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserProfile;
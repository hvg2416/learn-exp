import React, { Component } from 'react';
import '../styles/userProfile.css';
import FullScreenLoader from './fullScreenLoader';
import SmallLoader from './smallLoader';
import { MdEdit } from 'react-icons/md';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                thumbnail: ''
            },
            isUserInfoNonEditable: true
        };
        this.toggleEdit_SaveButton = this.toggleEdit_SaveButton.bind(this);
        this.handleUserInfoInputChange = this.handleUserInfoInputChange.bind(this);
    }

    componentDidMount() {

        if (!localStorage.getItem('jsonWebTokenforLearnX')) {
            localStorage.clear();
            window.location.replace('https://learnx.netlify.app/');
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
                    console.log(user_info);
                })
                .catch((err) => {
                    console.log(err)
                    profile_screen_loader.style.display = 'none';
                });
        }
    }

    toggleEdit_SaveButton(e) {

        let save_edit_btn_loader = document.getElementById('btn-loader-save-and-edit');
        let editBtn = document.getElementById('user-profile-form-edit-btn');
        let saveBtn = document.getElementById('user-profile-form-save-btn');
        if (e.target.id === 'user-profile-form-edit-btn') {
            this.setState({
                ...this.state,
                isUserInfoNonEditable: false
            });
            editBtn.style.display = 'none';
            saveBtn.style.display = 'flex';
        } else {
            save_edit_btn_loader.style.display = 'block';
            let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
            let user_profile_update_url = 'https://learn-exp-server.herokuapp.com/users/update/' + localStorage.getItem('jsonWebTokenforLearnX');

            let formData = new FormData();
            let userProfileImageInput = document.getElementById('user-profile-image');
            formData.append('firstname', this.state.userInfo.firstname);
            formData.append('lastname', this.state.userInfo.lastname);
            formData.append('userImage', userProfileImageInput.files[0]);

            fetch(corsproxyurl + user_profile_update_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jsonWebTokenforLearnX')
                },
                body: formData
            }).then(res => res.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        ...this.state,
                        isUserInfoNonEditable: true
                    });

                    let corsproxyurl = "https://cors-anywhere.herokuapp.com/";
                    let user_url = `https://learn-exp-server.herokuapp.com/users/${localStorage.getItem('jsonWebTokenforLearnX')}`;

                    fetch(corsproxyurl + user_url)
                        .then((res) => res.json())
                        .then((result) => {
                            console.log('User Profile After Update: ');
                            console.log(result);
                            let imgBBAPIFormData = new FormData();
                            imgBBAPIFormData.append('image', result.thumbnail);
                            console.log('Before imgBB API Fetch Call');
                            fetch('https://api.imgbb.com/1/upload?key=32ecb8c78e2225cdf9de6d70d8cad94a', {
                                method: 'POST',
                                body: imgBBAPIFormData
                            })
                                .then(res => res.json())
                                .then((result) => {
                                    console.log('Uploaded Image to IMBB API Service : ');
                                    console.log(result.data.display_url);

                                    let user_thumbnail_update_url = `https://learn-exp-server.herokuapp.com/users/update_user_thumbnail_url/${localStorage.getItem('jsonWebTokenforLearnX')}`;

                                    fetch(corsproxyurl + user_thumbnail_update_url, {
                                        method: 'POST',
                                        body: {
                                            thumbnail: result.data.display_url
                                        }
                                    }).then(res => res.json())
                                        .then((response) => {
                                            console.log('Updated imgBB API url to database : ');
                                            console.log(response);
                                        }).catch((err) => console.log(err));

                                }).catch((err) => console.log(err));
                            console.log('After imgBB API Fetch Call');
                        }).catch((err) => console.log(err));

                })
                .catch(err => console.log(err))
                .finally(() => {
                    save_edit_btn_loader.style.display = 'none';
                    editBtn.style.display = 'block';
                    saveBtn.style.display = 'none';
                });
        }
    }

    handleUserInfoInputChange(e) {
        let input_field_id = e.target.id;
        if (input_field_id === 'user-firstname') {
            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    firstname: e.target.value
                },
            });
        } else if (input_field_id === 'user-lastname') {
            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    lastname: e.target.value
                },
            });
        }
        else if (input_field_id === 'user-email') {
            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    email: e.target.value
                },
            });
        } else if (input_field_id === 'user-username') {
            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    username: e.target.value
                },
            });
        }
        else if (input_field_id === 'user-profile-image') {
            this.setState({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    userProfileImage: e.target.value
                },
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
                                    <div className='user-profile-main-header-user-picture-div'>
                                        <img alt="User Profile Pic" src={this.state.userInfo.thumbnail} className='user-profile-main-header-user-image' ></img>
                                        <label id='user-profile-image-input-label' htmlFor='user-profile-image'> <MdEdit /> </label>
                                        <input onChange={this.handleUserInfoInputChange} className='user-profile-image-input' type='file' id='user-profile-image' disabled={this.state.isUserInfoNonEditable}></input>
                                    </div>
                                    <span className='user-profile-main-header-user-full-name'> {`${this.state.userInfo.firstname} ${this.state.userInfo.lastname}`} </span>
                                </div>
                            </div>
                            <div className='col user-profile-main-div-user-info-div'>
                                <form>
                                    <div className='form-group user-profile-info-div'>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-firstname'>First Name</label>
                                            <input onChange={this.handleUserInfoInputChange} value={this.state.userInfo.firstname} type='text' className='form-control user-profile-input-field' id='user-firstname' disabled={this.state.isUserInfoNonEditable}></input>
                                        </div>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-lastname'>Last Name</label>
                                            <input onChange={this.handleUserInfoInputChange} value={this.state.userInfo.lastname} type='text' className='form-control user-profile-input-field' id='user-lastname' disabled={this.state.isUserInfoNonEditable}></input>
                                        </div>
                                    </div>
                                    <div className='form-group user-profile-info-div'>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-email'>Email</label>
                                            <input onChange={this.handleUserInfoInputChange} value={this.state.userInfo.email} type='text' className='form-control user-profile-input-field' id='user-email' disabled></input>
                                        </div>
                                        <div className='user-profile-form-groups'>
                                            <label htmlFor='user-username'>Username</label>
                                            <input onChange={this.handleUserInfoInputChange} value={this.state.userInfo.username} type='text' className='form-control user-profile-input-field' id='user-username' disabled></input>
                                        </div>
                                    </div>
                                    <div className='user-profile-form-edit-and-save-btn-div'>
                                        <div className='user-profile-form-edit-btn-div'>
                                            <div onClick={this.toggleEdit_SaveButton} className='user-profile-form-edit-and-save-btn' id='user-profile-form-edit-btn'>Edit Info</div>
                                        </div>
                                        <div className='user-profile-form-save-btn-div'>
                                            <div onClick={this.toggleEdit_SaveButton} className='user-profile-form-edit-and-save-btn' id='user-profile-form-save-btn'>Save
                                                <div id='btn-loader-save-and-edit'>
                                                    <SmallLoader />
                                                </div>
                                            </div>
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
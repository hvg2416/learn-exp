import React, { Component } from 'react';
import '../styles/userProfile.css';

class UserProfile extends Component {

    render() {

        return (
            <div className='container-fluid user-profile-container-fluid-div'>
                <div className='container user-profile-container-div'>
                    <div className='row user-profile-left-menu-div'></div>
                    <div className='row user-profile-main-div'>
                        <div className='col user-profile-main-div-header-div'>

                        </div>
                        <div className='col user-profile-main-div-user-info-div'>
                            <form>
                                <div className='form-group user-profile-info-div'>
                                    <div className='user-profile-form-groups'>
                                        <label for='user-firstname'>First Name</label>
                                        <input type='text' className='form-control user-profile-input-field' id='user-firstname' disabled></input>
                                    </div>
                                    <div className='user-profile-form-groups'>
                                        <label for='user-lastname'>Last Name</label>
                                        <input type='text' className='form-control user-profile-input-field' id='user-lastname' disabled></input>
                                    </div>
                                </div>
                                <div className='form-group user-profile-info-div'>
                                    <div className='user-profile-form-groups'>
                                        <label for='user-email'>Email</label>
                                        <input type='text' className='form-control user-profile-input-field' id='user-email' disabled></input>
                                    </div>
                                    <div className='user-profile-form-groups'>
                                        <label for='user-username'>Username</label>
                                        <input type='text' className='form-control user-profile-input-field' id='user-username' disabled></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
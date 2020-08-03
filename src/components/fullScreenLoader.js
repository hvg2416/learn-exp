import React, { Component } from 'react';
import '../styles/fullScreenLoader.css';

class FullScreenLoader extends Component {

    render(){

        return(
            <div className='fullscreen-loader'>
                <div className='fullscreen-loader-loading-div'></div>
            </div>
        );
    }
}

export default FullScreenLoader;
import React from 'react';

import logo from './job.png'; 
import './style.css';

class Logo extends React.Component {
    public render() {
        return (
            <div className="logo-container">
                <img src={logo} alt=".."/>
            </div>
        )
    }
}

export default Logo;
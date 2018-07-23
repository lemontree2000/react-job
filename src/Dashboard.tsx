import React from "react";
import { Link, Route } from 'react-router-dom'
import App from './App';

function Erying() {
    return <div>二营</div>
}

function Sanying() {
    return <div>三营</div>
}

class DashBoard extends React.Component {
    public render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/dashboard">一营</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/erying">二营</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/sanying">三营</Link>
                    </li>
                </ul>
                <Route path="/dashboard/" exact={true} component={App}/>
                <Route path="/dashboard/erying" component={Erying}/>
                <Route path="/dashboard/sanying" component={Sanying}/>
            </div>
        )
    }
}

export default DashBoard;

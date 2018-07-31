import React from "react";
import { Link, Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from './store/reducer/Auth.redux';
import {Button} from 'antd-mobile';

import App from './App';

function Erying() {
    return <div>二营</div>
}

function Sanying() {
    return <div>三营</div>
}
interface Iprops {
    isAuth?: any,
    logout?: () =>{}
}

// 组建需要的方法
const actionsCreators = {
    logout
  }

@(connect(
    (state: any) => {
    return {isAuth: state.auth.isAuth}
    },
    actionsCreators
) as any)

class DashBoard extends React.Component<Iprops, any> {
    public render() {
        const app = (
            <div>
                <Button onClick={this.props.logout}>注销</Button>
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
                <Route path="/dashboard/" exact={true} component={App} />
                <Route path="/dashboard/erying" component={Erying} />
                <Route path="/dashboard/sanying" component={Sanying} />
            </div>
        )
        const redirectToLogin = <Redirect to="/login"/>
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default DashBoard;

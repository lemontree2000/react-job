import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { Button } from "antd-mobile";
import { login } from "./Auth.redux";
const mapStateToProps = (state: any) => {
    return {isAuth: state.auth.isAuth}
}

interface Iprops {
    isAuth?: boolean,
    login?: () =>{}
}

@(connect(mapStateToProps, {login}) as any)
class Auth extends React.Component<Iprops, any> {
    public componentDidMount() {
        axios.get('/api/data').then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    public render() {
        console.log(this.props);
        return (
            <div>
                {this.props.isAuth ? <Redirect to="/dashboard"/> : null}
                <h2>你没有权限,需要登陆才能看</h2>
                <Button onClick={this.props.login}>登陆</Button>
            </div>
        )
    }
}

export default Auth;

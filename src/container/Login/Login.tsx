import React, { KeyboardEvent } from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { IregisterData } from '../../types/user';
import Logo from '../../component/Logo/Logo';
import { login } from '../../store/reducer/user.redux';
import JobForm from '../../HOC/JobForm/Jobform';

interface ILoginProps {
    resgiter?: () => {},
    history?: any,
    login: typeof login
    user: IregisterData
}


@(connect(
    (state: any) => ({ user: state.User }),
    { login }
) as any)

@(JobForm as any)

class Login extends React.Component<ILoginProps | any, IregisterData> {
    constructor(props: ILoginProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    public register() {
        this.props.history.push('/register');
    }
   
    public handleLogin() {
        this.props.login(this.props.state);
    }
    public handleKeyDown(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.handleLogin();
        }
    }
    public render() {
        return (
            <div>
                {this.props.user.redirectTo && this.props.user.redirectTo !== '/login' ? <Redirect to={this.props.user.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <p className="error-msg">{this.props.user.msg ? this.props.user.msg : null}</p>

                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                            placeholder="请输入用户">
                            用户
                        </InputItem>
                        <InputItem
                            placeholder="请输入密码"
                            onChange={v => this.props.handleChange('pwd', v)}
                            onKeyDown={this.handleKeyDown}
                            type="password">
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;
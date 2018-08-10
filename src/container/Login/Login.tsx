import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { IregisterData } from '../../types/user';
import Logo from '../../component/Logo/Logo';
import { login } from '../../store/reducer/user.redux';

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
class Login extends React.Component<ILoginProps, IregisterData> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }

    public register() {
        this.props.history.push('/register');
    }

    public handleChange(key: string, val: any) {
        this.setState({
            [key]: val
        } as any)
    }
    public handleLogin() {
        console.log(this.state);
        this.props.login(this.state);
    }
    public render() {
        return (
            <div>
                {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <p className="error-msg">{this.props.user.msg ? this.props.user.msg : null}</p>

                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                            placeholder="请输入用户">
                            用户
                        </InputItem>
                        <InputItem
                            placeholder="请输入密码"
                            onChange={v => this.handleChange('pwd', v)}
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
import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';


import Logo from '../../component/Logo/Logo';

interface ILoginProps {
    resgiter?: () => {},
    history?: any
}



class Login extends React.Component<ILoginProps, {}> {
    constructor(props: ILoginProps) {
        super(props);
        this.register = this.register.bind(this);
    }

    public register() {
        this.props.history.push('/register');
    }

    public render() {
        return (
            <div>
              
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入用户">用户</InputItem>
                        <InputItem placeholder="请输入密码" type="password">密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;
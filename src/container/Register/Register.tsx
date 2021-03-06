import React from 'react';
import { List, InputItem, WingBlank, Picker, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';

import Logo from '../../component/Logo/Logo';
import { district } from '../../config/constant';
import { regisger } from '../../store/reducer/user.redux';
import { IregisterData } from '../../types/user';
import './style.css';
import { Redirect } from 'react-router-dom';
import JobForm from '../../HOC/JobForm/Jobform';

// interface IdistrictItem {
//     value: string,
//     label: string
// }
interface IRegisterProps {
    user: IregisterData,
    regisger: typeof regisger
}

interface IRegisterState {
    user: string,
    pwd: string,
    repeatPwd: string,
    type: [string]
}
@(connect(
    (state: any) => {
        return { user: state.User };
    },
    { regisger }
) as any)

@(JobForm as any)

class Register extends React.Component<IRegisterProps | any, IRegisterState> {
    constructor(props: IRegisterProps) {
        super(props);
        this.handleResgister = this.handleResgister.bind(this);
    }
    public componentDidMount() {
        this.props.handleChange('type', ['boss'])
    }
    public handleResgister() {
        this.props.regisger(this.props.state as any);
    }
  
    public render() {
        return (
            <div>
                {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <p className="error-msg">{this.props.user.msg ? this.props.user.msg : null}</p>
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('repeatPwd', v)}
                        >确认密码</InputItem>
                        <Picker onChange={v => this.props.handleChange('type', v)} data={district} value={this.props.state.type} cols={1} className="forss">
                            <List.Item arrow="horizontal">用户类型</List.Item>
                        </Picker>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleResgister}>注册</Button>
                </WingBlank>

            </div>
        )

    }
}

export default Register;
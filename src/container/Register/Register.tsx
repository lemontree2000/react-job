import React from 'react';
import { List, InputItem, WingBlank, Picker, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/Logo/Logo';
import { district } from '../../config/constant';



// interface IdistrictItem {
//     value: string,
//     label: string
// }


interface IRegisterState {
    user?: string,
    pwd?: string,
    repeatPwd?: string,
    type?: [string]
}
class Register extends React.Component<{}, IRegisterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pwd: '',
            repeatPwd: '',
            type: ['boss'],
            user: '',
        }
        this.handleResgister = this.handleResgister.bind(this);
    }
    public handleResgister() {
        console.log(this.state);
    }
    public handleChange(key: string, val: any) {
        this.setState({
            [key]: val
        } as any)
    }
    public render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('repeatPwd', v)}
                        >确认密码</InputItem>
                        <Picker onChange={v => this.handleChange('type', v)} data={district} value={this.state.type} cols={1} className="forss">
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
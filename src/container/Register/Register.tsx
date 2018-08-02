import React from 'react';
import { List, InputItem, WingBlank, Picker, WhiteSpace, Button } from 'antd-mobile';

import Logo from '../../component/Logo/Logo';

interface Iprops {
    a?: string
}

// interface IdistrictItem {
//     value: string,
//     label: string
// }

interface Istate {
    district?: any
}
class Register extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            district: [
                {
                    label: 'BOSS',
                    value: '1'
                },
                {
                    label: '牛人',
                    value: '2'
                }
            ]
        }
    }


    public render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                        <InputItem>确认密码</InputItem>
                        <Picker data={this.state.district} cols={1} className="forss">
                            <List.Item arrow="horizontal">用户类型</List.Item>
                        </Picker>
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary">注册</Button>
                </WingBlank>

            </div>
        )

    }
}

export default Register;
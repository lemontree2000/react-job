import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/AvatarSelector/AvatarSelector';
import { connect } from 'react-redux';
import { update } from '../../store/reducer/user.redux';

@(connect(
    (state: any) => ({ user: state.User }),
    { update }
) as any)
class BossInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    public handleChange(key: string, value: any) {
        this.setState({
            [key]: value
        });
    }
    public selectAvatar(v: string) {
        this.setState({
            avatar: v
        });
        return {};
    }
    public render() {
        return (
            <div>
                
                <NavBar mode="dark">Boss完善信息页</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar} />
                <InputItem
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    rows={5}
                    title="职位要求"
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('desc', v)}
                />
                <Button type="primary" onClick={() => {
                    this.props.update(this.state);
                }}>保存 </Button>
            </div >
        )
    }
}

export default BossInfo;
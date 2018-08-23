import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import { Redirect } from 'react-router-dom';
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
            title: '',
            avatar: '',
            desc: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this);
        this.submitInfo = this.submitInfo.bind(this);
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
    public submitInfo() {
        const { avatar, title, desc } = this.state;
        if (!avatar || !title || !desc) {
            return Toast.info('请完成信息填写');
        }
        this.props.update(this.state);
    }
    public render() {
        const { user: { redirectTo }, location: { pathname } } = this.props;
        return (
            <div>
                {redirectTo && redirectTo !== pathname ? <Redirect to={redirectTo} /> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar} />
                <InputItem
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('title', v)}>
                    求职职位
                </InputItem>
                <TextareaItem
                    rows={5}
                    title="个人简介"
                    placeholder="请输入"
                    onChange={(v) => this.handleChange('desc', v)}
                />
                <Button type="primary" onClick={this.submitInfo}>保存 </Button>
            </div >
        )
    }
}

export default BossInfo;
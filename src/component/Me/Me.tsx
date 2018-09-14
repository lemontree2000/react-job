import React from 'react'
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { logoutSubmit } from '../../store/reducer/user.redux';
import { Redirect } from 'react-router-dom';

const { alert } = Modal;
@(connect(
    (state: any) => state.User,
    { logoutSubmit }
) as any)

class Me extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    public logout() {
        console.log(this.props);
        this.props.logoutSubmit();
        browserCookies.erase('user');
    }
    public render() {
        console.log(this.props);
        const { avatar, user, type, company, title, desc, money ,redirectTo} = this.props;
        const { Item } = List;
        const { Brief } = Item;
        return user ? <div>
            <Result
                img={<img width={55} style={{ borderRadius: '50%' }} src={require(`../../assets/image/${avatar}.png`)} />}
                title={user}
                message={type === 'boss' ? company : ''}
            />
            <List renderHeader={() => '简介'}>
                <Item
                    multipleLine={true}
                >
                    {title}
                    {desc.split('\n').map((v: any) => (<Brief key={v}>{v}</Brief>))}
                    {money ? <Brief>薪资：{money}</Brief> : ''}
                </Item>
            </List>
            <WhiteSpace />
            <List >
                <Item onClick={() => {
                    alert('退出登录', '是否确认退出登录？？', [
                        { text: 'Cancel', onPress: () => console.log('cancel') },
                        { text: 'Ok', onPress: () => this.logout() },
                    ])
                }}>
                    退出登录
                </Item>
            </List>
        </div> : redirectTo === '/login' ? <Redirect to={redirectTo} /> : null
    }
}

export default Me;
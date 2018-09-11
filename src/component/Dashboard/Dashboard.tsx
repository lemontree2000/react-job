import React from "react";
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Route, Switch } from 'react-router-dom'
import NavLink from '../NavLink/NavLink'
import Boss from '../Boss/Boss';
import Genius from '../Genius/Genius'
import Me from '../Me/Me'

function Msg() {
    return <div>牛人</div>
}

@(connect(
    state => state
) as any)
class DashBoard extends React.Component<any, any> {
    public render() {
        const user = this.props.User;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === '牛人',
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'boss列表',
                component: Genius,
                hide: user.type === 'boss',
            },
            {
                path: '/msg',
                text: 'msg',
                icon: 'msg',
                title: '消息',
                component: Msg
            },
            {
                path: '/me',
                text: 'me',
                icon: 'user',
                title: '个人中心',
                component: Me
            }
        ]
        console.log(navList);
        const currentNavItem: any = navList.find(v => v.path === pathname) || {};
        return (
            <section>
                <header className="fixed-header">
                    <NavBar mode="dark">{currentNavItem.title}</NavBar>
                </header>
                <section style={{ marginTop: 45 }}>
                    <Switch>
                        {
                            navList.map((v) => (
                                <Route key={v.path} component={v.component} path={v.path} />
                            ))
                        }
                    </Switch>
                </section>
                <footer>
                    <NavLink data={navList as any} />
                </footer>
            </section>
        )
    }
}

export default DashBoard;

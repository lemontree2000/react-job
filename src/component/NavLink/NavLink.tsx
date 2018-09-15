import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

interface INavLinkProps {
    data: [any],
    history?: any
    location?: any
}
@(withRouter as any)
@(connect(
    state => state
) as any)
class NavLink extends React.Component<INavLinkProps | any, any> {
    constructor(props: INavLinkProps | any) {
        super(props)
    }
    public render() {
        const { data, history, location } = this.props;
        const navList = data.filter((v: any) => !v.hide);
        const { chat } = this.props
        return (
            <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 1 }}>
                <TabBar
                    noRenderContent={true}
                >
                    {
                        navList.map((item: any) => {
                            return (
                                <TabBar.Item
                                    badge={item.title === '消息' ? chat.unread : 0}
                                    key={item.path}
                                    title={item.title}
                                    icon={{ uri: require(`../../assets/image/${item.icon}.png`) }}
                                    selectedIcon={{ uri: require(`../../assets/image/${item.icon}-active.png`) }}
                                    selected={item.path === location.pathname}
                                    onPress={() => { history.push(item.path) }}
                                />
                            )
                        })
                    }
                </TabBar>
            </div>
        )
    }
}

export default NavLink;


import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

interface INavLinkProps {
    data: [any],
    history?: any
    location?: any
}
@(withRouter as any)
class NavLink extends React.Component<INavLinkProps, any> {
    constructor(props: INavLinkProps | any) {
        super(props)
    }
    public render() {
        const { data, history, location } = this.props;
        const navList = data.filter(v => !v.hide);

        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0, zIndex: -1 }}>
                <TabBar>
                    {
                        navList.map((item) => {
                            return (
                                <TabBar.Item
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


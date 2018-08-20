import React from 'react'
import Axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../store/reducer/user.redux';

// props继承RouteComponentProps
// 使this.prop可以使用history等对象
export interface IAuthPorps extends RouteComponentProps<any> {
    loadData: (data: any) => {}
}
@(connect(
    null,
    { loadData }
) as any)

@(withRouter as any)
class AuthRouter extends React.Component<IAuthPorps, {}> {
    constructor(props: IAuthPorps) {
        super(props)
    }
    public componentDidMount() {
        const { history, location } = this.props;
        const { pathname } = location;
        const routerList = ['/login', '/register']
        console.log(this.props)


        if (routerList.indexOf(pathname) > -1) {
            return;
        }
        // 获取用户信息
        Axios.get('/api/user/info')
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // 有登陆信息
                        this.props.loadData(res.data.data);
                    } else {
                        // 没有登陆信息
                        console.log(1);
                        history.replace('/login');
                    }
                }
            })
        // 判断用户是否登陆
        // 如果是login 则不用跳转
        // 用户的类型 身份是boss还是牛人
        // 用户是否完善信息(选择头像,个人简介)

    }
    public render() {
        return <span/>
    }
}

export default AuthRouter;
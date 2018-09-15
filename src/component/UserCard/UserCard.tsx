import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@(withRouter as any)
class UserCard extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    public handleUserClick(v: any) {
        const { history } = this.props;
        history.push(`/chat/${v._id}`)
    }
    public render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {
                    this.props.userList.map((v: any) => (
                        v.avatar ?
                            <div key={v._id}>
                                <WhiteSpace />
                                <Card onClick={this.handleUserClick.bind(this, v)}>
                                    <Header thumb={require(`../../assets/image/${v.avatar}.png`)} title={v.user} extra={v.title} />
                                    <Body>
                                        {v.type === 'boss' ? <div>公司：{v.company}</div> : ''}

                                        {v.desc.split('\n').map((item: any) => (
                                            <div key={item}>{item}</div>
                                        ))}
                                        {v.type === 'boss' ? <div>薪资：{v.money}</div> : ''}
                                    </Body>
                                </Card>
                            </div>
                            : null
                    ))
                }
            </WingBlank>
        )
    }
}

export default UserCard;
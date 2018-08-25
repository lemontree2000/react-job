import React from 'react';
import Axios from 'axios';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';


class Boss extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }
    public componentDidMount() {
        Axios.get('/api/user/list?type=牛人').then((res: any) => {
            if (res.data.code === 0) {
                this.setState({
                    data: res.data.data
                })
            }
        })
    }
    public render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {
                    this.state.data.map((v: any) => (
                        v.avatar ?
                            <div>
                                <WhiteSpace />
                                <Card>
                                    <Header thumb={require(`../../assets/image/${v.avatar}.png`)} title={v.user} extra={v.title} />
                                    <Body>
                                        {v.desc.split('\n').map((item: any) => (
                                            <p>{item}</p>
                                        ))}
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

export default Boss;
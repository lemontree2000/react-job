import React from 'react'
import { connect } from 'react-redux';
import { Result } from 'antd-mobile';

@(connect(
    (state: any) =>  state.User ,
    {}
) as any)

class Me extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        console.log(this.props);
        const { avatar, user } = this.props;
        return user ? <div>
            <Result
                img={<img width={55} style={{borderRadius: '50%'}} src={require(`../../assets/image/${avatar}.png`)} />}
                title={user}
            />
            <p>用户中心</p>
        </div> : null
    }
}

export default Me;
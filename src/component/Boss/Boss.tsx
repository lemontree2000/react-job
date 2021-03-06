import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../store/reducer/charuser.redux';
import UserCard from '../UserCard/UserCard';

@(connect(
    (state: any) => state.chatuser,
    { getUserList }
) as any)
class Boss extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public componentDidMount() {
        this.props.getUserList('牛人')
    }
    public render() {

        return (
            <UserCard userList={this.props.userList} />
        )
    }
}

export default Boss;
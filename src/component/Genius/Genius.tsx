import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../store/reducer/charuser.redux';
import UserCard from '../UserCard/UserCard';

@(connect(
    (state: any) => state.chatuser,
    { getUserList }
) as any)
class Genius extends React.Component<any, any> {
    public componentDidMount() {
        this.props.getUserList('boss')
    }
    public render() {
        return (
            <UserCard userList={this.props.userList} />
        )
    }
}

export default Genius;
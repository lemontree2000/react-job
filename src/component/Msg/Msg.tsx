import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@(connect(
    state => state,
    {}
) as any)
@(withRouter as any)
class Msg extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }
    // tslint:disable-next-line:no-empty
    public componentDidMount() {
    }
    public render() {
        const chatGroup = {};
        const Item = List.Item;
        const Brief = Item.Brief;
        const { chat: { users, chatMsg }, User: { _id } } = this.props;
        chatMsg.forEach((v: any) => {
            chatGroup[v.chatid] = chatGroup[v.chatid] || [];
            chatGroup[v.chatid].push(v);
        });
        const chatList = (Object).values(chatGroup).sort((a: any, b: any) => {
            const lastitemA = a[a.length - 1].create_time;
            const lastitemb = b[b.length - 1].create_time;
            return lastitemb - lastitemA;
        })

        return (
            <div>
                {
                    chatList.map((v: any, indx: any) => {
                        const lastitem = v[v.length - 1];

                        const targetId = lastitem.to === _id ? lastitem.from : lastitem.to;
                        const targetUser = users[targetId];
                        const unread = v.filter((item: any) => {
                            return !item.read && item.to === _id;
                        }).length;
                        const avatar = require(`../../assets/image/${targetUser.avatar}.png`)
                        return (
                            <List key={lastitem._id}>
                                <Item
                                    extra={<Badge text={unread} />}
                                    thumb={avatar}
                                    arrow="horizontal"
                                    onClick={() => {
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {lastitem.content}
                                    <Brief>{targetUser.name}</Brief>
                                </Item>
                            </List>
                        )
                    })
                }
            </div>
        )
    }
}

export default Msg;
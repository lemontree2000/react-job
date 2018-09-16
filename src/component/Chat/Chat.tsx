import React from 'react'
import { List, InputItem, Toast, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../store/reducer/chat.redux';
import { getChatId } from '../../common/util';;


@(connect(
    (state) => state,
    {
        getMsgList,
        sendMsg,
        recvMsg,
        readMsg
    }
) as any)
export default class Chat extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    public componentDidMount() {
        if (this.props.chat.chatMsg.length === 0) {
            this.props.recvMsg()
            this.props.getMsgList();
        }
    }
    public componentWillUnmount() {
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }
    public handleSubmitMsg() {
        // socket.emit('sendmsg', this.state)
        if (this.state.text === '') {
            return Toast.info('请输入内容')
        }
        const from = this.props.User._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '' })
    }
    public render() {
        const emoji = `😄 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 👿`;
        const emojiList = emoji.split(' ').filter((v: any) => v).map((v: any) => ({ text: v }));
        const { chatMsg, users } = this.props.chat;
        const { user: userId } = this.props.match.params;
        const Item = List.Item;
        const chatMsgList = chatMsg.filter((v: any) => {
            return getChatId(this.props.User._id, userId) === v.chatid
        });
        return (
            <div id="chat-page">
                <NavBar
                    leftContent={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    mode="dark">
                    {users[userId] ? users[userId].name : ''}
                </NavBar>
                {
                    chatMsgList.map((v: any) => {
                        const avatar = require(`../../assets/image/${users[v.from].avatar}.png`);
                        return userId === v.from ?
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                            :
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar} />}
                                    className="chat-me"
                                >{v.content}</Item>
                            </List>
                    })
                }
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={
                                <div >
                                    <span
                                        style={{ padding: 10, marginTop: 2 }}
                                        onClick={() => {
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                            setTimeout(function () {
                                                window.dispatchEvent(new Event('resize'))
                                            }, 0)
                                        }}
                                    >😄</span>
                                    <span style={{ padding: '10px' }} onClick={() => this.handleSubmitMsg()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {
                        this.state.showEmoji ?
                            <Grid
                                data={emojiList}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(e: any) => {
                                    this.setState({
                                        text: this.state.text + e.text
                                    })
                                }}
                            /> : null
                    }

                </div>
            </div>
        )
    }
}
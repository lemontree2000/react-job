import io from 'socket.io-client';
const socket = io('ws://localhost:8081');
import axios from 'axios';

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息

const MSG_RECV = 'MSG_RECV';

const MSG_READ = 'MSG_READ';

const initState = {
    chatMsg: [],
    users: [],
    unread: 0
}

export function chat(state = initState, action: any) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatMsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter((v: any) => !v.read && v.to === action.payload.userId).length
            }
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.userId ? 1 : 0;
            return { ...state, chatMsg: [...state.chatMsg, action.payload.msg], unread: state.unread + n }
        case MSG_READ:
            const { from, num } = action.payload;
            return {
                ...state, chatMsg: state.chatMsg.map((v: any) => {
                    if (v.from === from) {
                        v.read = true;
                    }
                    return v
                }), unread: state.unread - num
            }
        default:
            return state;
    }
}

function msgList(msgs: any, users: any, userId: any) {
    return { type: MSG_LIST, payload: { msgs, users, userId } }
}
function msgRecv(msg: any, userId: any) {
    return { type: MSG_RECV, payload: { msg, userId } }
}

function msgRead({ from, userid, num }: any) {
    return { type: MSG_READ, payload: { from, userid, num } }
}
export function recvMsg() {
    return (dispatch: any, getState: any) => {
        socket.on('recvmsg', function (data: any) {
            const { User } = getState();
            dispatch(msgRecv(data, User._id))
        })
    }
}

export function getMsgList() {
    return (dispatch: any, getState: any) => {
        axios.get('/api/user/getMsgList')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const { User } = getState();
                    dispatch(msgList(res.data.msgs, res.data.users, User._id))
                }
            })
    }
}

export function readMsg(from: any) {
    return (dispatch: any, getState: any) => {
        axios.post('/api/user/readmsg', {
            from
        }).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().User._id;
                dispatch(msgRead({ userid, from, num: res.data.num }))
            }
        })
    }
}

export function sendMsg({ from, to, msg }: any) {
    return (dispatch: any) => {
        socket.emit('sendmsg', { from, to, msg })
    }
}
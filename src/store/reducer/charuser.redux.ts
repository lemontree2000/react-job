import Axios from 'axios';
const USER_LIST = 'USER_LIST';


const initState = {
    userList: []
}

export function chatuser(state = initState, action: any) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userList: action.payload }
        default:
            return state
    }
}

function userList(data: any) {
    return { type: USER_LIST, payload: data }
}

export function getUserList(type: any) {
    return (dispacth: any) => {
        Axios.get('/api/user/list?type=' + type).then((res: any) => {
            if (res.data.code === 0) {
                dispacth(userList(res.data.data))
            }
        })
    }
}
import axios from 'axios';
import { Dispatch } from 'redux';
import { IregisterData } from '../../types/user'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';


const initState = {
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}


// reducer
export function User(state = initState, action: { type: string, payload: IregisterData, msg: string }) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, isAuth: true, msg: '', ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        default:
            return state;
    }
    return state;
}


// action creator
function errorMsg(msg: string) {
    return { msg, type: ERROR_MSG }
}

function regisgerSuccess(data: IregisterData) {
    return { type: REGISTER_SUCCESS, payload: data }
}

export function regisger(registerData: IregisterData) {
    const { user, pwd, repeatPwd, type } = registerData;
    if (!user || !pwd || !repeatPwd || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('密码和确认密码有误');
    }
    return (dispath: Dispatch) => {
        axios.post('/user/rregister', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispath(regisgerSuccess({ user, pwd, type }))
                } else {
                    dispath(errorMsg(res.data.msg));
                }
            })
    }
}

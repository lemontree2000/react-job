import axios from 'axios';
import { Dispatch } from 'redux';
import { IregisterData } from '../../types/user'
import { getRedirectPath } from '../../common/util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT';



const initState = {
    redirectTo: '',
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
            return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload as any), msg: '', ...action.payload };
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg };
        case AUTH_SUCCESS:
            return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload as any), msg: '', ...action.payload };
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...initState, redirectTo: '/login' }
        default:
            return state;
    }
}

export function logoutSubmit() {
    return { type: LOGOUT }
}

export function update(data: any) {
    return (dispatch: any) => {
        axios.post('/api/user/updateInfo', data)
            .then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function login({ user, pwd }: IregisterData) {
    if (!user || !pwd) {
        return errorMsg('用户名必须输入');
    }
    return (dispatch: Dispatch) => {
        axios.post('api/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

function authSuccess(obj: any) {
    const { pwd, ...data } = obj;
    return { type: AUTH_SUCCESS, payload: data }
}
export function loadData(userinfo: any) {
    return { type: LOAD_DATA, payload: userinfo }
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
        axios.post('/api/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispath(regisgerSuccess({ user, pwd, type }))
                } else {
                    dispath(errorMsg(res.data.msg));
                }
            })
    }
}

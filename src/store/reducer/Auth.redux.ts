const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {
    isAuth: false,
    user: '李云龙'
}

export function auth(state = initState, action: any) {
    console.log(action);
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuth: true }
            break;
        case LOGOUT:
            return { ...state, isAuth: false }
        default:
            return state;
    }
}

//  action creator

export function login() {
    return { type: LOGIN }
};
export function logout() {
    return { type: LOGOUT }
};
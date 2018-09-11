// 合并所有reducer 并返回

import { combineReducers } from "redux";
// import { counter } from './reducer/index.redux';
// import { auth } from './reducer/Auth.redux';
import { User } from './reducer/user.redux';
import { chatuser } from './reducer/charuser.redux';


export default combineReducers({
    User,
    chatuser
});
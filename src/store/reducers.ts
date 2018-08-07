// 合并所有reducer 并返回

import { combineReducers } from "redux";
// import { counter } from './reducer/index.redux';
// import { auth } from './reducer/Auth.redux';
import {user} from './reducer/user.redux';


export default combineReducers({
    user
});
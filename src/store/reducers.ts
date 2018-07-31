// 合并所有reducer 并返回

import { combineReducers } from "redux";
import { counter } from './reducer/index.redux';
import { auth } from './reducer/Auth.redux';


export default combineReducers({ counter, auth });
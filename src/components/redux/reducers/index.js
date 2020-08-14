import { combineReducers } from 'redux';
import Login from './LoginReducers';
export default combineReducers({
    auth: Login
});
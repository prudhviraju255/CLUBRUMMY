import { combineReducers } from 'redux';
import Login from './LoginReducers';
import ClubPlayersRegistrationReducers from './ClubPlayersRegistrationReducers';
export default combineReducers({
    auth: Login,
    clubsInfo: ClubPlayersRegistrationReducers
});
import { combineReducers } from 'redux';
import alerts from './alertReducer';

const reducers = combineReducers({
    alerts
});

export default reducers;
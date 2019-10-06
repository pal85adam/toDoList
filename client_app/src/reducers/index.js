import { combineReducers } from 'redux';
import alerts from './alertReducer';
import users from './userReducer';
import tasks from "./tasksReducer";

const reducers = combineReducers({
    alerts,
    users,
    tasks
});

export default reducers;
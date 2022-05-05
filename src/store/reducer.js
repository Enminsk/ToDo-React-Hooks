import { TASKS_ACTIONS, FILTER_STATUSES } from './constants';
import { combineReducers } from 'redux';
import { reducer as taskReducer } from './slice';


const INITIAL_STATE_FILTER = {
    filter: FILTER_STATUSES.ALL,
};


const filterReducer = (state = INITIAL_STATE_FILTER, action) => {
    switch (action.type) {
        case TASKS_ACTIONS.CHANGE_FILTER: {
            return {
                ...state,
                filter: action.payload
            };
        }
        default:
            return state;
    }
};

export const rootReducer = combineReducers({ taskReducer, filterReducer });



import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    roic: null,
    totalE: null,
    refLink: null,
    refE: null,
    btc: null,
    error: null,
    loading: false,
};

const getStatStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getStatSuccess = (state, action) => {
    return updateObject(state, {
        roic: action.stats.roic,
        totalE: action.stats.totalE,
        refLink: action.stats.refLink,
        refE: action.stats.refE,
        btc: action.btc,
        error: null,
        loading: false,
    });
};

const getStatFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_STAT_START:
            return getStatStart(state, action);
        case actionTypes.GET_STAT_SUCCESS:
            return getStatSuccess(state, action);
        case actionTypes.GET_STAT_FAIL:
            return getStatFail(state, action);
        default:
            return state;
    }
};

export default reducer;

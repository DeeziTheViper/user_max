import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    chart: [],
    error: null,
    loading: false,
};

const getChartStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getChartSuccess = (state, action) => {
    return updateObject(state, {
        chart: action.chart,
        error: null,
        loading: false,
    });
};

const getChartFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CHART_START:
            return getChartStart(state, action);
        case actionTypes.GET_CHART_SUCCESS:
            return getChartSuccess(state, action);
        case actionTypes.GET_CHART_FAIL:
            return getChartFail(state, action);
        default:
            return state;
    }
};

export default reducer;

import axios from "axios";
import * as actionTypes from "./actionTypes";


export const getChartSuccess = chart => {
    return {
        type: actionTypes.GET_CHART_SUCCESS,
        chart
    };
};

export const getChartFail = error => {
    return {
        type: actionTypes.GET_CHART_FAIL,
        error: error
    };
};


export const getChart = (username, token) => {
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`/userApi/userhistory?${username}`)
            .then(res => {
                const chart = res.data;
                dispatch(getChartSuccess(chart));
            }).catch(err => {
                dispatch(getChartFail(err));
            })
    }
}
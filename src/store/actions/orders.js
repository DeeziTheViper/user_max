import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getOrderStart = () => {
    return {
        type: actionTypes.GET_ORDER_START
    };
};

export const getOrderSuccess = orders => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        orders
    };
};

export const getOrderFail = error => {
    return {
        type: actionTypes.GET_ORDER_FAIL,
        error: error
    };
};


export const getOrder = (username, token) => {
    return dispatch => {
        dispatch(getOrderStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`/listApi/orders?username=${username}`)
            .then(res => {
                const orders = res.data.reverse();
                dispatch(getOrderSuccess(orders));
            }).catch(err => {
                dispatch(getOrderFail(err));
            })
    }
}
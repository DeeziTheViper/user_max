import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getProductStart = () => {
    return {
        type: actionTypes.GET_PRODUCT_START
    };
};

export const getProductSuccess = products => {
    return {
        type: actionTypes.GET_PRODUCT_SUCCESS,
        products
    };
};

export const getProductFail = error => {
    return {
        type: actionTypes.GET_PRODUCT_FAIL,
        error: error
    };
};


export const getProduct = () => {
    return dispatch => {
        dispatch(getProductStart());
        axios.get("/api/products/")
            .then(res => {
                const products = res.data;
                dispatch(getProductSuccess(products));
            }).catch(err => {
                dispatch(getProductFail(err));
            })
    }
}
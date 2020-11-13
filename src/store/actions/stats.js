import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getStatStart = () => {
    return {
        type: actionTypes.GET_STAT_START
    };
};

export const getStatSuccess = (stats, btc) => {
    return {
        type: actionTypes.GET_STAT_SUCCESS,
        stats,
        btc: btc,
    };
};

export const getStatFail = error => {
    return {
        type: actionTypes.GET_STAT_FAIL,
        error: error
    };
};


export const getStat = (username, token) => {
    return dispatch => {
        dispatch(getStatStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        }
        axios.get(`/userApi/userstatus?username=${username}`)
            .then(res => {
                const stats = {
                    roic: res.data[0]?.storage,
                    totalE: res.data[0]?.allStorage,
                    refE: res.data[0]?.referral_earning
                }
                const btc = res.data[0]?.storage;
                dispatch(getStatSuccess(stats,));
                axios.defaults.headers = {
                    "Content-Type": "application/json",
                }
                return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${btc}`)
                    .then(res => {
                        const btc = res.data;
                        dispatch(getStatSuccess(stats, btc));
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                dispatch(getStatFail(err));
            })
    }
}
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = (detail) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: detail,
    detail: null,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("pMonths");
  localStorage.removeItem("pData");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      email, password
    }
    axios
      .post("/rest-auth/login/", user)
      .then(res => {
        if (res.data.key) {
          const user = {
            token: res.data.key,
            username: res.data.user_detail.username,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),
            userId: res.data.user,
            email: res.data.user_detail.email,
            btc_wallet: res.data.user_detail.btc_wallet,
            balance: res.data.user_detail.balance,
            compounding: res.data.user_detail.compounding,
            withdrawn: res.data.user_detail.withdrawn,
            hash: res.data.user_detail.hash,
            last_login: res.data.user_detail.last_login,
            activeP: res.data.user_detail.activeP,
            activeA: res.data.user_detail.activeA,
            refLink: res.data.user_detail.Link,
            first_name: res.data.user_detail.first_name,
            last_name: res.data.user_detail.last_name,
            country: res.data.user_detail.country,
            address: res.data.user_detail.address,
            zip_code: res.data.user_detail.zip_code,
            city: res.data.user_detail.city,
          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }
        if (res.data.error) {
          const detail = {
            detail: res.data.error
          }
          dispatch(authFail(detail));
        }

      })
      .catch(fail => {
        dispatch(authFail({ detail: "Unable to Log you in" }));
      });
  };
};



export const authSignup = (username, email, password1, password2, btc_wallet) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username, email, password1, password2, btc_wallet
    };
    axios
      .post("/rest-auth/registration/", user)
      .then(res => {
        if (res.data.detail) {
          const user = {
            detail: res.data.detail,
            username,
            email,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),

          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }

        if (res.data.error) {
          const sev = {
            sev: res.data.error
          }
          dispatch(authFailS(sev));
        }
      })
      .catch(fail => {
        dispatch(authFailS({ detail: "Unable to proceed further" }));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

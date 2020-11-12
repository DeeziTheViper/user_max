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

export const authLogin = () => {
  return dispatch => {
    dispatch(authStart());

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(authSuccess(user));
      dispatch(checkAuthTimeout(3600));
    }
    else {
      dispatch(authFail());
    }

  }
};



export const authSignup = (username, email, password1, password2, btc_wallet) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username, email, password1, password2, btc_wallet,
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
          const detail = {
            detail: res.data.error
          }
          dispatch(authFail(detail));
        }
      })
      .catch(fail => {
        console.log(fail);
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

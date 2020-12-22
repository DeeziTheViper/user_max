
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";


import AdminLayout from "layouts/Admin/Admin.js";
import Home from "views/home.js";
import LoginPage from "views/login.js";
import RegisterPage from "views/register.js";
import Rates from "views/Rates.js";
import VerifyPage from "views/Verify.js";
import ForgotPass from "views/ForgotPassword.js";
import PassReset from "views/PasswordReset.js";
import EmailSent from "views/youremailSent.js";
import ContactPage from "views/contact.js"


import authReducer from "./store/reducers/auth";
import orderReducer from "./store/reducers/orders";
import productReducer from "./store/reducers/products";
import statReducer from "./store/reducers/stats";
import chartReducer from "./store/reducers/chart";
import "assets/css/loader.css";

import "assets/scss/black-dashboard-react.scss";
import "assets/scss/styles.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const rootReducer = combineReducers({
  auth: authReducer,
  orders: orderReducer,
  products: productReducer,
  stats: statReducer,
  chart: chartReducer
})
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));


const hist = createBrowserHistory();
const user = JSON.parse(localStorage.getItem("user"));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={hist}>
        <Switch>
          {user ?
            <Redirect from="/login" to="/user/dashboard" />
            :
            <Route path="/login" render={props => <LoginPage {...props} />} />
          }

          <Route path="/support" render={props => <ContactPage {...props} />} />
          {user ?
            <Route path="/register" render={props => <RegisterPage {...props} />} />
            :
            <Redirect from="/register" to="/user/dashboard" />
          }
          <Route path="/pricing" render={props => <Rates {...props} />} />
          <Route path="/password-reset/confirm/:uid/:token/" render={props => <PassReset {...props} />} />
          <Route path="/email-sent" render={props => <EmailSent {...props} />} />
          <Route
            path="/verifyemail/:token"
            render={props => <VerifyPage {...props} />}
          />

          <Route
            path="/password/reset"
            render={props => <ForgotPass {...props} />}
          />

          {user ?
            <Switch>
              <Route path="/user" render={props => <AdminLayout {...props} />} />
              <Redirect from="/user" to="/user/dashboard" />
            </Switch>
            :

            <Redirect from="/user" to="/login" />
          }
          <Route path="/" render={props => <Home {...props} />} />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

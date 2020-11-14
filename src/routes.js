
import Dashboard from "views/Dashboard.js";
import Compound from "views/Compound.js";
import Withdraw from "views/Withdraw.js";
import Ledger from "views/Ledger.js";

import Cart from "views/Cart.js";
import Transactions from "views/Map.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bank",
    component: Dashboard,
    layout: "/user"
  },
  {
    path: "/cart",
    name: "Cart",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-cart",
    component: Cart,
    layout: "/user"

  },
  {
    path: "/compound",
    name: "Compound",
    icon: "tim-icons icon-calendar-60",
    component: Compound,
    layout: "/user"
  },

  {
    path: "/map",
    name: "Transactions",
    rtlName: "خرائط",
    icon: "tim-icons icon-paper",
    component: Transactions,
    layout: "/user"
  },
  {
    path: "/user-profile",
    name: "Account",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/user"
  },
  {
    path: "/liquidate",
    name: "Withdraw",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-wallet-43",
    component: Withdraw,
    layout: "/user"
  },
  {
    path: "/cashbook",
    name: "CashBook",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-notes",
    component: Ledger,
    layout: "/user"
  },

];
export default routes;

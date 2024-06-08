import SignUp from "../auth/SignUp";
import { Login } from "../auth/Login";
import { HomePage } from "../pages/Home/HomePage";
import { IRoute } from "../model/route.model";

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: HomePage,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/signup",
    exact: true,
    component: SignUp,
    name: "Sign Page",
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    name: "Login Page",
    protected: false,
  },
];

import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import Login from "pages/Login";
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import PrivateRoute from "./Auth/PrivateRoute";

import {
  ROOT,
  DASHBOARD,
  AUTH_PAGE1,
} from "navigation/CONSTANTS";

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route path="/login">
          <Login />
        </Route>
        {/* List all private/auth routes here */}
        <PrivateRoute path={AUTH_PAGE1} exact>
          <AuthorizedPage1 />
        </PrivateRoute>
        <PrivateRoute path={ROOT} exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path={DASHBOARD} exact>
          <Dashboard />
        </PrivateRoute>
        {/* Do not hesitate to play around by moving some routes from public to private and vice-versa */}
        {/* <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute> */}

        {/* List a generic 404-Not Found route here */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
